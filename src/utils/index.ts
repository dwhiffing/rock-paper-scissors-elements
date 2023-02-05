import { Player, Challenge } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'

export const poll = async () =>
  (await (await fetch('/api/poll')).json()) as {
    players: Player[]
    challenges: Challenge[]
  }

export const attack = (
  attacker: string,
  attackee: string,
  attackerHand: number[],
  wager: number,
) =>
  fetch('/api/attack', {
    method: 'POST',
    body: JSON.stringify({ attacker, attackee, wager, attackerHand }),
  })

export const respond = (id: number, hand?: number[]) =>
  fetch('/api/respond', {
    method: 'POST',
    body: JSON.stringify({ id, attackeeHand: hand }),
  })

export const getChallengeExists = (
  challenges: Challenge[] | undefined,
  a: string,
  b: string,
) =>
  challenges?.some((c) => {
    if (typeof c.outcome === 'number') return false

    const { attackerId: _a, attackeeId: _b } = c
    return (_b === a && _a === b) || (_a === a && _b === b)
  })

export function generateId() {
  var arr = new Uint8Array(40 / 2)
  if (typeof window !== 'undefined') window.crypto.getRandomValues(arr)
  return `0x${Array.from(arr, (d) => d.toString(16).padStart(2, '0')).join('')}`
}

export const formatAddress = (s: string) => `${s.slice(0, 6)}...${s.slice(-4)}`

export function usePollingEffect(
  asyncCallback: any,
  dependencies = [],
  { interval = 10000, onCleanUp = () => {} } = {},
) {
  const timeoutIdRef = useRef<any>(null)
  useEffect(() => {
    let _stopped = false
    ;(async function pollingCallback() {
      try {
        await asyncCallback()
      } finally {
        timeoutIdRef.current =
          !_stopped && setTimeout(pollingCallback, interval)
      }
    })()
    return () => {
      _stopped = true
      clearTimeout(timeoutIdRef.current)
      onCleanUp?.()
    }
  }, [...dependencies, interval])
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const item = window.localStorage.getItem(key)
    if (item) setStoredValue(JSON.parse(item))
  }, [key])

  return [storedValue, setValue] as const
}
