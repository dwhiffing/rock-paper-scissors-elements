import { Challenge } from '@prisma/client'
import { Hand } from './Hand'

export const HistoryItem = (props: {
  address: string
  challenge: Challenge
}) => {
  const { outcome, attackeeId, attackerId, attackerHand, attackeeHand, wager } =
    props.challenge

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
          wager={wager}
          hand={attackerHand}
          otherHand={attackeeHand!}
          outcome={typeof outcome === 'number' ? outcome : 0}
          isOwner={attackerId === props.address}
        />
        <Hand
          flip={false}
          address={attackeeId}
          wager={wager}
          hand={attackeeHand!}
          otherHand={attackerHand}
          outcome={typeof outcome === 'number' ? outcome : 0}
          isOwner={attackeeId === props.address}
        />
      </div>
    </div>
  )
}
