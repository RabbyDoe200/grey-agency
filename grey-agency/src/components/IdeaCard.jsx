import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function IdeaCard({ idea, index = 0 }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 14 })
    setGlare({ x: px * 100, y: py * 100, opacity: 0.12 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare((g) => ({ ...g, opacity: 0 }))
    setHovered(false)
  }

  return (
    // Scroll-reveal wrapper
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {/* Tilt wrapper */}
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        className="group relative overflow-hidden rounded-sm bg-white/5 cursor-pointer h-full"
      >
        <Link to={idea.slug} className="flex flex-col h-full">
          {/* Image — fixed aspect ratio */}
          <div className="relative overflow-hidden aspect-[4/3] shrink-0">
            <motion.img
              src={idea.image}
              alt={idea.title}
              loading="lazy"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover"
            />

            {/* Color gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to top, ${idea.color} 0%, transparent 60%)`,
                opacity: hovered ? 0.45 : 0.65,
              }}
            />

            {/* Glare layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
              }}
            />

            {/* Hover reveal badge */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-white border border-white/50 px-4 py-2 backdrop-blur-sm bg-black/20">
                View Work
              </span>
            </motion.div>
          </div>

          {/* Content — grows to fill remaining height so all cards align */}
          <div className="flex flex-col flex-1 p-6">
            {/* Client — fixed 1 line */}
            <p className="text-xs tracking-widest uppercase text-[#c8a96e] font-medium mb-2 truncate">
              {idea.client}
            </p>
            {/* Title — fixed 2 lines */}
            <h3
              className="text-lg font-serif leading-snug transition-colors duration-300 line-clamp-2 mb-2"
              style={{ color: hovered ? '#c8a96e' : '#f5f5f0' }}
            >
              {idea.title}
            </h3>
            {/* Tagline — fixed 2 lines */}
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2 flex-1">
              {idea.tagline}
            </p>

            {/* Animated underline row — always at the bottom */}
            <div className="mt-5 relative overflow-hidden pb-1">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/30">
                <span>View Work</span>
                <motion.span
                  animate={{ x: hovered ? 4 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  →
                </motion.span>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-[#c8a96e]"
                initial={{ width: '0%' }}
                animate={{ width: hovered ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </Link>
      </motion.article>
    </motion.div>
  )
}
