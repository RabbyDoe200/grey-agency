import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  // Outer ring — laggy spring
  const springX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.5 })

  // Inner dot — snappy spring
  const dotSpringX = useSpring(dotX, { stiffness: 600, damping: 30 })
  const dotSpringY = useSpring(dotY, { stiffness: 600, damping: 30 })

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      setHidden(false)
    }

    const enter = () => setHidden(false)
    const leave = () => setHidden(true)
    const down = () => setClicked(true)
    const up = () => setClicked(false)

    // Detect hoverable elements
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]')
      setHovered(!!el)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseenter', enter)
    window.addEventListener('mouseleave', leave)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseenter', enter)
      window.removeEventListener('mouseleave', leave)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        animate={{
          width: hovered ? 56 : clicked ? 20 : 36,
          height: hovered ? 56 : clicked ? 20 : 36,
          opacity: hidden ? 0 : 1,
          borderColor: hovered ? '#F44336' : '#ffffff',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          borderRadius: '50%',
          border: '1.5px solid white',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        animate={{
          width: hovered ? 6 : 5,
          height: hovered ? 6 : 5,
          opacity: hidden ? 0 : 1,
          backgroundColor: hovered ? '#F44336' : '#ffffff',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
