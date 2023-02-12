import { Challenge } from '@prisma/client'
import { Hand } from './Hand'

export const HistoryItem = ({
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
      <div
        className={`flex ${
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
    </div>
  )
}
