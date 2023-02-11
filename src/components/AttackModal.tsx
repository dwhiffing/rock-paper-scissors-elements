import { useState } from 'react'
import Input from './Input'
import { Modal } from './Modal'

const random = () => Math.floor(Math.random() * 5)

export const AttackModal = (props: {
  balance: number
  isResponse: boolean
  open: boolean
  onClose: () => void
  onSubmit: (hand: number[], wager: number) => void
}) => {
  const [hand, setHand] = useState([
    random(),
    random(),
    random(),
    random(),
    random(),
  ])
  const [wager, setWager] = useState(1)
  if (!props.open) return null

  return (
    <Modal onClose={props.onClose}>
      <div className="flex flex-col gap-6 m-4">
        <Input
          value={hand}
          onSubmit={() => props.onSubmit(hand, wager)}
          onChange={setHand}
        />

        <div className="flex gap-x-4">
          {!props.isResponse && (
            <div className="flex flex-1 items-center gap-x-6">
              <span>Wager</span>
              <input
                autoFocus
                className="py-1 px-2 w-24"
                onChange={(e) =>
                  setWager(
                    Math.min(props.balance, Math.max(1, +e.target.value)),
                  )
                }
                value={wager}
                placeholder="wager"
                type="number"
              />
            </div>
          )}
          <button
            className="flex-1"
            onClick={() => props.onSubmit(hand, wager)}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  )
}
