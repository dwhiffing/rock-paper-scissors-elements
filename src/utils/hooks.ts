import { Player, Challenge } from '@prisma/client'
import { useEffect, useRef } from 'react'

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
