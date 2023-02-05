import { formatAddress } from '@/utils'
import { Challenge } from '@prisma/client'

export const ChallengeItem = (props: {
  balance: number
  address: string
  challenge: Challenge
  onAccept: () => void
  onReject: () => void
}) => (
  <div className="flex flex-col justify-between gap-4 border-gray-600 border-2 p-4 rounded-md">
    <p>
      {formatAddress(props.challenge.attackerId)}: {props.challenge.wager} (
      {props.challenge.attackerHand}) ({props.challenge.outcome})
    </p>
    <div className="flex gap-4">
      {props.address === props.challenge.attackeeId ? (
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
      )}
    </div>
  </div>
)
