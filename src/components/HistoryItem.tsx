import { Challenge } from '@prisma/client'
import { formatAddress } from '@/utils'

export const HistoryItem = (props: {
  address: string
  challenge: Challenge
}) => {
  const { outcome, attackeeId, attackerId, attackerHand, attackeeHand, wager } =
    props.challenge

  const attackeeClassNames = [
    attackeeId === props.address ? 'font-extrabold' : 'font-extralight',
    outcome === 0
      ? 'text-gray-500'
      : outcome! > 0
      ? 'text-red-500'
      : 'text-green-500',
  ].join(' ')

  const attackerClassNames = [
    attackerId === props.address ? 'font-extrabold' : 'font-extralight',
    outcome === 0
      ? 'text-gray-500'
      : outcome! < 0
      ? 'text-red-500'
      : 'text-green-500',
  ].join(' ')

  const _attackeeHand = attackeeHand!.split(',').map(Number)
  const _attackerHand = attackerHand.split(',').map(Number)
  const weWon =
    outcome !== 0 &&
    ((outcome! > 0 && props.address === attackerId) ||
      (outcome! < 0 && props.address === attackeeId))

  const getClassName = (c: number, i: number, id: string, hand: number[]) => {
    const isWin = c === (hand[i] + 1) % 5 || c === (hand[i] + 2) % 5
    return [
      id === props.address ? 'font-extrabold' : 'font-extralight',
      c === hand[i]
        ? 'text-gray-500'
        : !isWin
        ? 'text-green-500'
        : 'text-red-500',
    ].join(' ')
  }

  const borderClassName =
    outcome === 0
      ? 'border-gray-500'
      : weWon
      ? 'border-green-500'
      : 'border-red-500'

  const textClassName =
    outcome === 0 ? 'text-gray-500' : weWon ? 'text-green-500' : 'text-red-500'
  return (
    <div
      className={`flex flex-col font-mono text-xs border-2 p-4 rounded-md gap-y-6 ${borderClassName}`}
    >
      <div className="flex justify-between">
        <span className={attackerClassNames}>{formatAddress(attackerId)}</span>
        <span className={textClassName}>
          {outcome === 0 ? '' : weWon ? '+' : '-'}
          {outcome === 0 ? 0 : wager}
        </span>
        <span className={attackeeClassNames}>{formatAddress(attackeeId)}</span>
      </div>

      <div className="flex flex-col justify-between font-sans text-base">
        <div className="flex justify-evenly">
          {_attackerHand.map((c, i) => (
            <span
              key={i}
              className={getClassName(c, i, attackerId, _attackeeHand)}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex justify-evenly">
          {_attackeeHand.map((c, i) => (
            <span
              key={i}
              className={getClassName(c, i, attackeeId, _attackerHand)}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
