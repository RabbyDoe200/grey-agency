import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import MagneticButton from '../components/MagneticButton'
import { featuredIdeas } from '../data/ideas'

// ── Hero slide component ──────────────────────────────────────────────────────
function HeroSlide({ idea, isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={idea.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={idea.image}
              alt={idea.title}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${idea.color}ee 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </div>

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-24 md:pb-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-[#F44336] font-medium mb-3"
            >
              {idea.client}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight max-w-3xl mb-4"
            >
              {idea.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base md:text-lg text-white/60 max-w-xl mb-8"
            >
              {idea.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Link
                to={idea.slug}
                className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-white border border-white/30 hover:border-[#F44336] hover:text-[#F44336] px-6 py-3 w-fit transition-all duration-300 group"
              >
                View Case Study
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Marquee ticker ────────────────────────────────────────────────────────────
function Marquee() {
  // Each "unit" is one repetition of the phrase with a separator.
  // We render enough units per half to guarantee the half is wider
  // than any viewport. 12 units per half is more than enough.
  const unit = 'FAMOUSLY EFFECTIVE\u00A0\u00A0·\u00A0\u00A0'
  const half = Array(12).fill(unit).join('')

  return (
    <div
      className="overflow-hidden border-y border-white/10 py-3 bg-black/50 backdrop-blur-sm"
      aria-hidden="true"
    >
      {/*
        Two halves, each min-width: 100vw.
        Animation shifts the track left by 50% (= one full half),
        then snaps back to 0 — the snap is invisible because both
        halves are pixel-for-pixel identical.
      */}
      <div className="marquee-track">
        <span className="marquee-half text-xs tracking-[0.25em] uppercase text-white/20 whitespace-nowrap">
          {half}
        </span>
        <span className="marquee-half text-xs tracking-[0.25em] uppercase text-white/20 whitespace-nowrap">
          {half}
        </span>
      </div>
    </div>
  )
}

// ── Stats section — count-up on hover ────────────────────────────────────────
function StatItem({ value, label, delay = 0 }) {
  const numeric = parseInt(value, 10)
  const suffix = value.replace(String(numeric), '')
  const [display, setDisplay] = useState(value)
  const [hovered, setHovered] = useState(false)
  const frameRef = useRef(null)

  const runCountUp = () => {
    if (isNaN(numeric)) return
    let start = 0
    const duration = 800
    const startTime = performance.now()
    clearInterval(frameRef.current)
    frameRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * numeric) + suffix)
      if (progress >= 1) clearInterval(frameRef.current)
    }, 16)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { setHovered(true); runCountUp() }}
      onMouseLeave={() => { setHovered(false); setDisplay(value) }}
      className="text-center cursor-default group"
    >
      <motion.p
        animate={{ scale: hovered ? 1.08 : 1, color: hovered ? '#F44336' : '#f5f5f0' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="text-5xl md:text-6xl font-serif mb-2"
      >
        {display}
      </motion.p>
      <p className="text-xs tracking-widest uppercase text-white/40 group-hover:text-white/60 transition-colors duration-300">
        {label}
      </p>
    </motion.div>
  )
}

// ── Home featured work card with tilt ────────────────────────────────────────
function HomeTiltCard({ idea, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 10 })
  }

  const MotionLink = motion(Link)

  return (
    <MotionLink
      ref={ref}
      to={idea.slug}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.03 : 1 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className="group relative overflow-hidden rounded-sm shrink-0 w-72 md:w-auto snap-start block"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={idea.image}
          alt={idea.title}
          loading="lazy"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${idea.color} 0%, transparent 60%)`,
            opacity: hovered ? 0.5 : 0.75,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs tracking-widest uppercase text-[#F44336] mb-1">{idea.client}</p>
          <motion.h3
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-base font-serif text-white leading-snug"
          >
            {idea.title}
          </motion.h3>
        </div>
      </div>
    </MotionLink>
  )
}

// ── Main Home page ────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const intervalRef = useRef(null)

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredIdeas.length)
    }, 5000)
  }

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (i) => {
    setActiveSlide(i)
    clearInterval(intervalRef.current)
    startInterval()
  }

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {featuredIdeas.map((idea, i) => (
          <HeroSlide key={idea.id} idea={idea} isActive={i === activeSlide} />
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-8 md:right-16 flex gap-2 z-10">
          {featuredIdeas.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === activeSlide
                  ? 'w-8 h-1.5 bg-[#F44336]'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 left-8 md:left-16 z-10 text-xs tracking-widest text-white/30">
          {String(activeSlide + 1).padStart(2, '0')} / {String(featuredIdeas.length).padStart(2, '0')}
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Stats ── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-[#F44336] text-center mb-16"
          >
            By the numbers
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            <StatItem value="100+" label="Years of creativity" delay={0} />
            <StatItem value="25" label="Studios worldwide" delay={0.1} />
            <StatItem value="18" label="Markets" delay={0.2} />
            <StatItem value="22" label="Cannes Lions 2025" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── Featured ideas preview ── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-3"
              >
                Made by Grey
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif text-white"
              >
                Selected Work
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/ideas"
                className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 group"
              >
                All Ideas
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Horizontal scroll strip */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3">
            {featuredIdeas.slice(0, 6).map((idea, i) => (
              <HomeTiltCard key={idea.id} idea={idea} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/ideas"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
            >
              All Ideas →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="py-24 md:py-40 px-6 md:px-10 bg-black relative overflow-hidden">
        {/* Decorative line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-6">Hello!</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
              We're Grey, a global collective of creative entrepreneurs.
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              One mission: to build Famously Effective ideas that deliver growth because they solve real business problems and make brands stand out in culture in a positive way.
            </p>
            <MagneticButton>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-white border border-white/20 hover:border-[#F44336] hover:text-[#F44336] px-6 py-3 transition-all duration-300 group"
              >
                Our Story
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </MagneticButton>          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Grand Effie', sub: 'Won in every market we operate in' },
              { label: 'Top 10 Network', sub: 'Cannes Lions 2024' },
              { label: 'Top 100', sub: "Newsweek Most Loved Workplaces" },
              { label: '12 Pencils', sub: 'D&AD 2025' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="border border-white/10 p-6 hover:border-white/20 transition-colors duration-300"
              >
                <p className="text-2xl font-serif text-[#F44336] mb-2">{item.label}</p>
                <p className="text-xs text-white/40 leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-10 bg-[#0a0a0a] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-6">Ready to lead the next era?</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 max-w-2xl mx-auto leading-tight">
            Let's build something famously effective.
          </h2>
          <MagneticButton strength={0.4}>
            <a
              href="mailto:hello@grey.com"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-black bg-[#F44336] hover:bg-white px-8 py-4 transition-all duration-300 font-medium group"
            >
              Get in Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </MagneticButton>        </motion.div>
      </section>
    </PageTransition>
  )
}
