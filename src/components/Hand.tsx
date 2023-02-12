import { formatAddress } from '@/utils'
import { useAccount } from 'wagmi'
import { ICONS } from './Icons'

export const Hand = (props: {
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
