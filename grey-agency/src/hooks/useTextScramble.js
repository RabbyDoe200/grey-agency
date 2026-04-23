import { useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Returns a ref to attach to a DOM element and a `scramble()` trigger.
 * On call, the element's text scrambles then resolves to the original.
 */
export function useTextScramble() {
  const elRef = useRef(null)
  const frameRef = useRef(null)
  const iterRef = useRef(0)

  const scramble = useCallback(() => {
    const el = elRef.current
    if (!el) return
    const original = el.dataset.text || el.innerText
    el.dataset.text = original

    let iteration = 0
    clearInterval(frameRef.current)

    frameRef.current = setInterval(() => {
      el.innerText = original
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < iteration) return original[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      if (iteration >= original.length) {
        clearInterval(frameRef.current)
        el.innerText = original
      }
      iteration += 0.5
    }, 30)
  }, [])

  return { elRef, scramble }
}
