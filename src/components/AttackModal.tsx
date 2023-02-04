import { useState } from 'react'
import { Modal } from './Modal'

export const AttackModal = (props: {
  isResponse: boolean
  open: boolean
  onClose: () => void
  onSubmit: (hand: string, wager: string) => void
}) => {
  const [hand, setHand] = useState('')
  const [wager, setWager] = useState('')
  if (!props.open) return null
  return (
    <Modal onClose={props.onClose}>
      <div className="flex flex-col gap-4">
        {!props.isResponse && (
          <input
            onChange={(e) => setWager(e.target.value)}
            value={wager}
            placeholder="wager"
          />
        )}
        <input
          onChange={(e) => setHand(e.target.value)}
          value={hand}
          placeholder="hand"
        />
        <button onClick={() => props.onSubmit(wager, hand)}>Submit</button>
      </div>
    </Modal>
  )
}
