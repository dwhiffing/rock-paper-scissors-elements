import { useEffect, useRef, useState } from 'react'

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
