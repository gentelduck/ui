import React from 'react'

export const useDebounceCallback = <T extends (...args: any[]) => void>(callback: T, delay?: number) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
