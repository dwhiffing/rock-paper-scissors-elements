import { Challenge } from '@prisma/client'
import { formatAddress } from '@/utils'
import { useAccount } from 'wagmi'
import { ICONS } from './Icons'

export const ActiveChallengeItem = (props: {
  balance: number
  address: string
  challenge: Challenge
  onAccept: () => void
  onHide: () => void
  onShow: () => void
  onReveal: () => void
  onReject: () => void
}) => (
  <div className="flex flex-col justify-between gap-4 border-gray-600 border-2 p-4 rounded-md">
    <div className="flex flex-col gap-y-6 justify-between">
      <div className="flex justify-between">
        <p>
          {formatAddress(
            props.address === props.challenge.attackerId
              ? props.challenge.attackeeId
              : props.challenge.attackerId,
          )}
        </p>
        <p>wager: {props.challenge.wager}</p>
      </div>
      {props.challenge.attackerSeenOutcomeAt && (
        <ChallengeItem address={props.address} challenge={props.challenge} />
      )}
    </div>

    <div className="flex gap-4">
      {typeof props.challenge.outcome !== 'number' ? (
        props.address === props.challenge.attackeeId ? (
          <>
            <button
              className="flex-1"
              disabled={props.balance < props.challenge.wager}
              onClick={props.onAccept}
            >
              accept
            </button>
            <button className="flex-1" onClick={props.onReject}>
              reject
            </button>
          </>
        ) : (
          <button className="flex-1" onClick={props.onReject}>
            cancel
          </button>
        )
      ) : props.challenge.attackerSeenOutcomeAt ? (
        props.address !== props.challenge.attackeeId ? (
          <>
            <button className="flex-1" onClick={props.onHide}>
              hide
            </button>
            <button className="flex-1" onClick={props.onShow}>
              show
            </button>
          </>
        ) : null
      ) : props.address !== props.challenge.attackeeId ? (
        <button onClick={props.onReveal}>Reveal</button>
      ) : (
        <span>waiting for response</span>
      )}
    </div>
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

const ChallengeItem = ({
  address,
  challenge,
}: {
  address: string
  challenge: Challenge
}) => {
  const { outcome, attackeeId, attackerId, attackerHand, attackeeHand, wager } =
    challenge

  return (
    <div
      className={`flex font-mono text-xs  ${
        attackerId === address ? 'flex-col-reverse' : 'flex-col'
      } justify-between font-sans text-base gap-y-6`}
    >
      {(address === attackerId || challenge.reveal === 1) && (
        <Hand
          className={attackerId !== address ? 'flex-col-reverse' : 'flex-col'}
          address={attackerId}
          wager={wager}
          hand={attackerHand}
          otherHand={attackeeHand!}
          isWinner={outcome! > 0}
          isDraw={outcome! === 0}
        />
      )}
      {(address === attackeeId ||
        address === attackerId ||
        challenge.reveal === 1) && (
        <Hand
          className={attackerId === address ? 'flex-col-reverse' : 'flex-col'}
          address={attackeeId}
          wager={wager}
          hand={attackeeHand!}
          otherHand={attackerHand}
          isWinner={outcome! < 0}
          isDraw={outcome! === 0}
        />
      )}
    </div>
  )
}

const Hand = (props: {
  hand: string
  className?: string
  otherHand?: string
  address?: string
  isWinner?: boolean
  isDraw?: boolean
  wager?: number
}) => {
  const { address: _address } = useAccount()
  const className = props.isDraw
    ? 'text-gray-500'
    : props.isWinner
    ? 'text-green-500'
    : 'text-red-500'

  return (
    <div className={`flex items-center gap-y-2 ${props.className}`}>
      <div className="flex flex-1 w-full h-12 justify-evenly">
        {props.hand?.split(',').map((c: any, i: number) => {
          const Component = ICONS[+c]
          const outcome = props.otherHand
            ? getOutcome(+c, +props.otherHand.split(',')[i])
            : null
          return (
            <Component
              className={
                outcome === 2 ? 'opacity-30' : outcome === 1 ? '' : 'opacity-50'
              }
              width={50}
              height={50}
              key={i}
            />
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
