import { formatAddress } from '@/utils'
import { Challenge } from '@prisma/client'
import { Hand } from './Hand'

export const ChallengeItem = (props: {
  balance: number
  address: string
  challenge: Challenge
  onAccept: () => void
  onReject: () => void
}) => (
  <div className="flex flex-col justify-between gap-4 border-gray-600 border-2 p-4 rounded-md">
    <div className="flex flex-col gap-y-2 justify-between">
      <p>
        {formatAddress(
          props.address === props.challenge.attackerId
            ? props.challenge.attackeeId
            : props.challenge.attackerId,
        )}{' '}
        {props.challenge.wager}
      </p>
      {props.address === props.challenge.attackerId && (
        <Hand hand={props.challenge.attackerHand} />
      )}
    </div>
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
