import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce';

const defaultOptions = { leading: false, trailing: true }
type stateType = {
  signal: number,
  debouncing: boolean
}
type debounceType = [string, Function, stateType]
export const useDebounce = (defaultValue: string, delay = 500, options = defaultOptions): debounceType => {
  const [value, setValueImmediately] = useState(defaultValue)
  const [debouncing, setDebouncing] = useState(false)
  const [signal, setSignal] = useState(Date.now())

  const setValue = useCallback(value => {
    setValueImmediately(value)
    setDebouncing(true)
    triggerUpdate()
  }, [])

  const triggerUpdate = useCallback(debounce(() => {
    setDebouncing(false)
    setSignal(Date.now())
  }, delay, options), [])

  const state: stateType = { signal, debouncing }
  return [value, setValue, state]
}

