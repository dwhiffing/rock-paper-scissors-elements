import { formatAddress } from '@/utils'
import { ICONS } from './Icons'

export const Hand = (props: {
  hand: string
  otherHand?: string
  address?: string
  flip?: boolean
  isOwner?: boolean
  outcome?: number
  wager?: number
}) => {
  const isWinner = props.outcome
    ? props.flip
      ? props.outcome > 0
      : props.outcome < 0
    : false
  const isDraw = props.outcome === 0
  const className = isDraw
    ? 'text-gray-500'
    : isWinner
    ? 'text-green-500'
    : 'text-red-500'

  return (
    <div
      className={`flex items-center gap-y-2 ${
        props.flip ? 'flex-col-reverse' : 'flex-col'
      }`}
    >
      <div className="flex flex-1 w-full h-12 justify-evenly">
        {props.hand.split(',').map((c: any, i: number) => {
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
            props.isOwner ? 'font-extrabold' : 'font-extralight',
            className,
          ].join(' ')}
        >
          {formatAddress(props.address)}{' '}
          {props.wager ? (
            <span className={className}>
              {isDraw ? '' : isWinner ? '+' : '-'}
              {isDraw ? 0 : props.wager}
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
