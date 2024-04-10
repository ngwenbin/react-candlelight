import { useCallback } from "react"
import { debounce } from "lodash"

const DEFAULT_CALLBACK_DELAY = 200

export const useDebouncedCallback = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay?: number
) => useCallback(debounce(callback, delay ?? DEFAULT_CALLBACK_DELAY), [])
