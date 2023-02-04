import { formatAddress } from '@/utils'
import { Challenge } from '@prisma/client'

export const ChallengeItem = (props: {
  challenge: Challenge
  onAccept: () => void
  onReject: () => void
}) => (
  <div className="flex justify-between">
    <p>
      {formatAddress(props.challenge.attackerId)}: {props.challenge.wager} (
      {props.challenge.attackerHand}) ({props.challenge.winnerIndex})
    </p>
    <div className="flex">
      <button onClick={props.onAccept}>accept</button>
      <button onClick={props.onReject}>reject</button>
    </div>
  </div>
)
