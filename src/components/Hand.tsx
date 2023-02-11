import { formatAddress } from '@/utils'
import { ICONS } from './Icons'

export const Hand = (props: {
  hand: string
  address?: string
  flip?: boolean
  isOwner?: boolean
  isWinner?: boolean
  isDraw?: boolean
  wager?: number
}) => {
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
        {props.hand?.split(',').map((c: any, i: number) => {
          const Component = ICONS[+c]
          return <Component width={50} height={50} key={i} />
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
              {props.isDraw ? '' : props.isWinner ? '+' : '-'}
              {props.isDraw ? 0 : props.wager}
            </span>
          ) : null}
        </span>
      )}
    </div>
  )
}
