import { Challenge } from '@prisma/client'
import { formatAddress } from '@/utils'
import { useAccount } from 'wagmi'
import { BlankIcon, ICONS } from './Icons'

interface Props {
  balance: number
  address: string
  challenge: Challenge
  onAccept: () => void
  onHide: () => void
  onShow: () => void
  onReveal: () => void
  onReject: () => void
}

export const ActiveChallengeItem = (props: Props) => (
  <div className="flex flex-col justify-between gap-4 border-gray-600 border-2 p-4 rounded-md">
    <div className="flex flex-col gap-y-6 justify-between">
      <p className="text-center">wager: {props.challenge.wager}</p>

      <ChallengeItem address={props.address} challenge={props.challenge} />
    </div>

    <ChallengeActions {...props} />
  </div>
)

export const PastChallengeItem = ({
  address,
  challenge,
}: {
  address: string
  challenge: Challenge
}) => {
  const { outcome, attackeeId, attackerId, attackerHand, attackeeHand, wager } =
    challenge

  const weWon =
    outcome !== 0 &&
    ((outcome! > 0 && address === attackerId) ||
      (outcome! < 0 && address === attackeeId))

  const borderClassName =
    outcome === 0
      ? 'border-gray-500'
      : weWon
      ? 'border-green-500'
      : 'border-red-500'

  return (
    <div
      className={`flex flex-col font-mono text-xs border-2 p-4 rounded-md ${borderClassName}`}
    >
      <ChallengeItem challenge={challenge} address={address} />
    </div>
  )
}

const ChallengeActions = (props: Props) => {
  const { address, balance, onAccept, onReject, onHide, onReveal, onShow } =
    props
  const {
    attackerId,
    attackeeId,
    wager,
    outcome,
    reveal,
    attackerSeenOutcomeAt,
  } = props.challenge

  const canAfford = balance >= wager

  return (
    <div className="flex gap-4">
      {typeof outcome !== 'number' ? (
        address === attackeeId ? (
          <>
            <button disabled={!canAfford} onClick={onAccept}>
              accept
            </button>
            <button onClick={onReject}>reject</button>
          </>
        ) : (
          <button onClick={onReject}>cancel</button>
        )
      ) : attackerSeenOutcomeAt ? (
        address === attackerId ? (
          typeof reveal !== 'number' ? (
            <>
              <button onClick={onHide}>hide</button>
              <button onClick={onShow}>show</button>
            </>
          ) : (
            <span>waiting for response</span>
          )
        ) : typeof reveal !== 'number' ? null : (
          <button onClick={onReveal}>Reveal</button>
        )
      ) : address === attackerId ? (
        <button onClick={onReveal}>Reveal</button>
      ) : (
        <span>waiting for response</span>
      )}
    </div>
  )
}

const ChallengeItem = ({
  address,
  challenge,
}: {
  address: string
  challenge: Challenge
}) => {
  const {
    outcome,
    attackeeId,
    attackerId,
    attackerHand,
    attackeeHand,
    wager,
    attackerSeenOutcomeAt,
    attackeeSeenOutcomeAt,
  } = challenge

  const isFinished =
    typeof outcome === 'number' &&
    !!(address === attackerId ? attackerSeenOutcomeAt : attackeeSeenOutcomeAt)

  return (
    <div
      className={`flex font-mono text-xs  ${
        attackerId === address ? 'flex-col-reverse' : 'flex-col'
      } justify-between font-sans text-base gap-y-6`}
    >
      <Hand
        className={attackerId !== address ? 'flex-col-reverse' : 'flex-col'}
        address={attackerId}
        wager={isFinished ? wager : undefined}
        hidden={
          address !== attackerId &&
          address === attackeeId &&
          (!attackeeSeenOutcomeAt || challenge.reveal !== 1)
        }
        showOutcome={isFinished}
        hand={attackerHand}
        otherHand={attackeeHand!}
        isWinner={outcome! > 0}
        isDraw={outcome! === 0}
      />

      <Hand
        className={attackerId === address ? 'flex-col-reverse' : 'flex-col'}
        address={attackeeId}
        hidden={address !== attackeeId && !attackerSeenOutcomeAt}
        showOutcome={isFinished}
        wager={isFinished ? wager : undefined}
        hand={attackeeHand || '-1,-1,-1,-1,-1'}
        otherHand={attackerHand}
        isWinner={outcome! < 0}
        isDraw={outcome! === 0}
      />
    </div>
  )
}

const Hand = (props: {
  hand: string
  hidden?: boolean
  showOutcome?: boolean
  className?: string
  otherHand?: string
  address?: string
  isWinner?: boolean
  isDraw?: boolean
  wager?: number
}) => {
  const { address: _address } = useAccount()
  const className = props.wager
    ? props.isDraw
      ? 'text-gray-500'
      : props.isWinner
      ? 'text-green-500'
      : 'text-red-500'
    : ''

  return (
    <div className={`flex items-center gap-y-2 ${props.className}`}>
      <div className="flex flex-1 w-full h-12 justify-evenly">
        {props.hand?.split(',').map((c: any, i: number) => {
          const Component = props.hidden ? BlankIcon : ICONS[+c] || BlankIcon
          const outcome = props.otherHand
            ? getOutcome(+c, +props.otherHand.split(',')[i])
            : null

          let className = outcome === 1 && c !== '-1' ? '' : 'opacity-50'

          if (props.hidden || !props.showOutcome) className = 'opacity-50'

          return (
            <Component className={className} width={50} height={50} key={i} />
          )
        })}
      </div>

      {props.address && (
        <span
          className={[
            _address === props.address ? 'font-extrabold' : 'font-extralight',
            className,
          ].join(' ')}
        >
          {formatAddress(props.address)}{' '}
          {props.wager ? (
            <span className={className}>
              {props.isDraw ? '' : props.isWinner ? '+' : '-'}
              {props.isDraw ? 0 : props.wager}
            </span>
          ) : null}
        </span>
      )}
    </div>
  )
}

const getOutcome = (a: number, b: number) => {
  const isLoss = a === (b + 1) % 5 || a === (b + 2) % 5
  return a === b ? 2 : isLoss ? 0 : 1
}
