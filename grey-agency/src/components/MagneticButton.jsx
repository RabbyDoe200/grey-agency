import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Wraps any element with a magnetic pull effect on hover.
 * The element shifts toward the cursor within its bounding box.
 */
export default function MagneticButton({ children, className = '', strength = 0.35, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
