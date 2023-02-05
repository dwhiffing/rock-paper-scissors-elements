import { Challenge } from '@prisma/client'
import { formatAddress } from '@/utils'

export const HistoryItem = (props: { challenge: Challenge }) => (
  <div className="flex flex-col border-gray-600 border-2 p-4 rounded-md">
    <p>
      {formatAddress(props.challenge.attackerId)} vs.{' '}
      {formatAddress(props.challenge.attackeeId)} ({props.challenge.wager})
    </p>
    <p>
      {props.challenge.attackerHand} vs {props.challenge.attackeeHand}
    </p>
    <p>outcome: {props.challenge.outcome}</p>
  </div>
)
