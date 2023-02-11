import React, { useRef, useEffect } from 'react'
import { Icon } from './Icons'

type Props = {
  value: number[]
  onChange: (res: number[]) => void
  onSubmit: () => void
}

const Input = ({ value, onChange, onSubmit }: Props) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([])
  const pattern = '[1-5]{1}'

  useEffect(() => {
    inputsRef.current[0].focus()
  }, [])

  const sendResult = () => {
    const res = inputsRef.current.map((input) => input.value).map((n) => +n - 1)
    onChange && onChange(res)
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
    } else if (e.key === 'Backspace') {
      if (target.value === '') {
        const sib =
          inputsRef.current[+(target.dataset.number || 0) - 1] ||
          inputsRef.current[4]
        sib.value = ''
        sib.focus()
        e.preventDefault()
      } else {
        target.value = ''
      }
    } else if (e.key === 'Enter') {
      onSubmit()
    }
    sendResult()
  }

  return (
    <div className="flex gap-x-1">
      {new Array(5).fill('').map((_, i) => (
        <div className="relative w-[20%]" key={i}>
          <input
            ref={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
            max="5"
            min="1"
            data-number={i}
            type="tel"
            maxLength={1}
            className="w-full h-20 bg-gray-600 text-transparent text-center"
            onKeyDown={handleOnKeyDown}
            pattern={pattern}
            autoComplete="off"
            onFocus={(e) => e.target.select()}
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
            value={value[i]}
          />
        </div>
      ))}
    </div>
  )
}

export default Input
