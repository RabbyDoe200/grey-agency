import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NewsCard({ item, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const [arrowX, setArrowX] = useState(0)

  const date = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    setArrowX((px - 0.5) * 8)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setArrowX(0) }}
      onMouseMove={handleMouseMove}
      className="group relative border-b border-white/10 py-8 overflow-hidden"
    >
      {/* Sliding background highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(90deg, rgba(200,169,110,0.04) 0%, transparent 100%)',
        }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-[#F44336]"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      <Link
        to={item.slug}
        className="flex flex-col md:flex-row md:items-start gap-6 pl-4"
      >
        {/* Thumbnail image */}
        {item.image && (
          <div className="md:w-48 md:h-32 shrink-0 overflow-hidden rounded-sm">
            <motion.img
              src={item.image}
              alt={item.title}
              loading="lazy"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-3">
            <motion.span
              animate={{ color: hovered ? '#F44336' : '#F4433699' }}
              className="text-xs tracking-widest uppercase font-medium"
            >
              {item.category}
            </motion.span>
            <span className="text-white/20 text-xs">·</span>
            <p className="text-xs text-white/30">{date}</p>
          </div>

          <motion.h3
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="text-lg font-serif text-white mb-2 leading-snug"
          >
            {item.title}
          </motion.h3>
          <p className="text-sm text-white/50 leading-relaxed">{item.excerpt}</p>

          <div className="mt-4 flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
            <span>Read more</span>
            <motion.span
              animate={{ x: arrowX }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
