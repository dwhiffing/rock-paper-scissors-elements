import { Challenge } from '@prisma/client'
import { formatAddress } from '@/utils'
import { ICONS } from './Icons'

export const HistoryItem = (props: {
  address: string
  challenge: Challenge
}) => {
  const { outcome, attackeeId, attackerId, attackerHand, attackeeHand, wager } =
    props.challenge

  const _attackeeHand = attackeeHand!.split(',').map(Number)
  const _attackerHand = attackerHand.split(',').map(Number)
  const weWon =
    outcome !== 0 &&
    ((outcome! > 0 && props.address === attackerId) ||
      (outcome! < 0 && props.address === attackeeId))

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
      <div className="flex flex-col justify-between font-sans text-base gap-y-6">
        <Hand
          flip
          address={attackerId}
          isWinner={outcome! > 0}
          wager={wager}
          isDraw={outcome === 0}
          isOwner={attackerId === props.address}
          hand={_attackerHand}
        />
        <Hand
          address={attackeeId}
          isDraw={outcome === 0}
          isWinner={outcome! < 0}
          wager={wager}
          isOwner={attackeeId === props.address}
          hand={_attackeeHand}
        />
      </div>
    </div>
  )
}

const Hand = (props: any) => {
  const className = props.isDraw
    ? 'text-gray-500'
    : props.isWinner
    ? 'text-green-500'
    : 'text-red-500'

  return (
    <div
      className={`flex items-center gap-y-2 ${
        props.flip ? 'flex-col-reverse' : 'flex-col'
      }`}
    >
      <div className="flex flex-1 w-full h-12 justify-evenly">
        {props.hand.map((c: any, i: number) => {
          const Component = ICONS[+c]
          return <Component width={50} height={50} key={i} />
        })}
      </div>

      <span
        className={[
          props.isOwner ? 'font-extrabold' : 'font-extralight',
          className,
        ].join(' ')}
      >
        {formatAddress(props.address)} (
        <span className={className}>
          {props.isDraw ? '' : props.isWinner ? '+' : '-'}
          {props.isDraw ? 0 : props.wager}
        </span>
        )
      </span>
    </div>
  )
}

// const getClassName = (c: number, i: number, hand: number[]) => {
//   const isWin = c === (hand[i] + 1) % 5 || c === (hand[i] + 2) % 5
//   return [
//     'font-extralight',
//     c === hand[i]
//       ? 'text-gray-500'
//       : !isWin
//       ? 'text-green-500'
//       : 'text-red-500',
//   ].join(' ')
// }
