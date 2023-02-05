import { formatAddress } from '@/utils'
import { Player } from '@prisma/client'

export const PlayerItem = (props: {
  player: Player
  disabled: boolean
  onClick: () => void
}) => (
  <div
    className="flex justify-between border-gray-600 border-2 p-4 rounded-md"
    key={props.player.address}
  >
    <p>
      {formatAddress(props.player.address)}
      {/* {Math.floor((Date.now() - +new Date(props.player.lastOnlineAt)) / 1000)} */}
    </p>

    <button disabled={props.disabled} onClick={props.onClick}>
      {props.disabled ? 'pending' : 'attack'}
    </button>
  </div>
)
