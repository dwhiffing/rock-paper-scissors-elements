import { useState } from 'react'
import { Modal } from './Modal'

export const AttackModal = (props: {
  balance: number
  isResponse: boolean
  open: boolean
  onClose: () => void
  onSubmit: (hand: number[], wager: number) => void
}) => {
  const [hand, setHand] = useState([0, 0, 0, 0, 0])
  const [wager, setWager] = useState(1)
  if (!props.open) return null

  return (
    <Modal onClose={props.onClose}>
      <div className="flex flex-col gap-4">
        {!props.isResponse && (
          <input
            autoFocus
            onChange={(e) =>
              setWager(Math.min(props.balance, Math.max(1, +e.target.value)))
            }
            value={wager}
            placeholder="wager"
            type="number"
          />
        )}
        <div className="flex justify-between gap-x-2">
          {new Array(5).fill('').map((_, i) => (
            <select
              onChange={(e) =>
                setHand((h) =>
                  h.map((_h, _i) => (i === _i ? +e.target.value : _h)),
                )
              }
              value={hand[i]}
              className="flex-1"
              key={i}
            >
              {new Array(5).fill('').map((_, i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          ))}
        </div>

        <div className="flex gap-x-4">
          <button
            className="flex-1"
            onClick={() => props.onSubmit(hand, wager)}
          >
            Submit
          </button>
          <button
            className="flex-1"
            onClick={() => {
              setWager(1)
              setHand([0, 0, 0, 0, 0])
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </Modal>
  )
}
