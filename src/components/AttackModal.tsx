import { useState } from 'react'

import React, { useRef, useEffect } from 'react'
import { Icon } from './Icons'

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
  const inputsRef = useRef<Array<HTMLInputElement>>([])
  const indexRef = useRef<number>(0)
  const pattern = '[1-5]{1}'

  useEffect(() => {
    inputsRef.current[0]?.focus()
    indexRef.current = 0
  }, [props.open])

  const sendResult = () => {
    const res = inputsRef.current
      .map((input, i) => input.value || hand[i] + 1)
      .map((n) => +n - 1)

    setHand(res)
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as EventTarget & HTMLInputElement
    if (+e.key > 0 && +e.key < 6) {
      target.value = e.key
      e.preventDefault()
      e.stopPropagation()
      const sib =
        inputsRef.current[+(target.dataset.number || 0) + 1] ||
        inputsRef.current[0]
      sib.focus()
      indexRef.current = +(sib.dataset.number || 0)
    } else if (e.key === 'Backspace') {
      if (target.value === '') {
        const sib =
          inputsRef.current[+(target.dataset.number || 0) - 1] ||
          inputsRef.current[4]
        sib.value = ''
        sib.focus()
        indexRef.current = +(sib.dataset.number || 0)
        e.preventDefault()
      } else {
        target.value = ''
      }
    } else if (e.key === 'Enter') {
      onSubmit()
    }
    sendResult()
  }

  const onSubmit = () => props.onSubmit(hand, wager)

  if (!props.open) return null

  return (
    <Modal
      className="h-[95vh] sm:h-auto flex flex-col justify-between !p-0"
      onClose={props.onClose}
    >
      <div className="flex flex-1 items-center gap-x-1 py-20 px-4 bg-gray-700">
        {new Array(5).fill('').map((_, i) => (
          <div className="relative w-[20%]" key={i}>
            <input
              ref={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
              max="5"
              min="1"
              data-number={i}
              type="tel"
              maxLength={1}
              className="w-full h-20 bg-gray-700 text-transparent text-center"
              onKeyDown={handleOnKeyDown}
              pattern={pattern}
              autoComplete="off"
              onFocus={(e) => {
                indexRef.current = +(e.target.dataset.number || 0)
              }}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => {
                if (+e.target.value < 1) e.target.value = '1'
                if (+e.target.value > 5) e.target.value = '5'
              }}
            />
            <Icon
              className="absolute inset-0 pointer-events-none"
              width="100%"
              height="100%"
              value={hand[i]}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-y-5 p-5">
        <div className="flex gap-x-2">
          {new Array(5).fill('').map((_, i) => (
            <button
              className="w-[20%] px-0 py-0 bg-transparent border-4 border-gray-300 rounded-full hover:opacity-70"
              key={i}
              onClick={() => {
                inputsRef.current[indexRef.current].value = `${i + 1}`
                indexRef.current = (indexRef.current + 1) % 5
                inputsRef.current[indexRef.current].focus()
                sendResult()
              }}
            >
              <Icon flat width="100%" height="100%" value={i} />
            </button>
          ))}
        </div>

        <div className="flex gap-x-4">
          {!props.isResponse && (
            <div className="flex flex-1 items-center gap-x-6">
              <span>Wager</span>
              <input
                className="py-1 px-2 w-full max-w-[100px]"
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

const Modal = (props: {
  className?: string
  children: any
  onClose: () => void
}) => (
  <div
    onClick={props.onClose}
    className="bg-[rgba(0,0,0,0.8)] fixed inset-0 flex justify-center items-center z-80"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-gray-600 text-white w-full max-w-md p-4 ${props.className}`}
    >
      {props.children}
    </div>
  </div>
)
