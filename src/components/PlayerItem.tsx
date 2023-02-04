import { formatAddress } from '@/utils'
import { Player } from '@prisma/client'

export const PlayerItem = (props: {
  player: Player
  disabled: boolean
  onClick: () => void
}) => (
  <div className="flex justify-between" key={props.player.address}>
    <p>
      {formatAddress(props.player.address)}:{' '}
      {Math.floor((Date.now() - +new Date(props.player.lastOnlineAt)) / 1000)}
    </p>

    <button disabled={props.disabled} onClick={props.onClick}>
      {props.disabled ? 'pending' : 'attack'}
    </button>
  </div>
)
