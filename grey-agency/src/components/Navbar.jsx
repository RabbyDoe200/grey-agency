import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Ideas', href: '/ideas' },
  { label: 'Locations', href: '/locations' },
  { label: 'News', href: '/news' },
]

// Individual nav link with text-scramble on hover
function ScrambleLink({ link, active }) {
  const elRef = useRef(null)
  const frameRef = useRef(null)

  const scramble = useCallback(() => {
    const el = elRef.current
    if (!el) return
    const original = link.label.toUpperCase()
    let iteration = 0
    clearInterval(frameRef.current)
    frameRef.current = setInterval(() => {
      el.innerText = original
        .split('')
        .map((char, i) => {
          if (i < iteration) return original[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      if (iteration >= original.length) {
        clearInterval(frameRef.current)
        el.innerText = original
      }
      iteration += 0.6
    }, 35)
  }, [link.label])

  return (
    <MagneticButton strength={0.25}>
      <Link
        to={link.href}
        onMouseEnter={scramble}
        className={`relative text-sm tracking-widest uppercase font-medium transition-colors duration-300 ${
          active ? 'text-[#F44336]' : 'text-white/70 hover:text-white'
        }`}
      >
        <span ref={elRef}>{link.label.toUpperCase()}</span>
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-px bg-[#F44336]"
          />
        )}
      </Link>
    </MagneticButton>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo — magnetic + scramble */}
          <MagneticButton strength={0.3}>
            <Link to="/" className="group">
              <LogoScramble />
            </Link>
          </MagneticButton>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <ScrambleLink link={link} active={location.pathname === link.href} />
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <MagneticButton strength={0.4}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-px bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-white origin-center"
              />
            </button>
          </MagneticButton>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/97 backdrop-blur-lg flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.15 }}
              >
                <Link
                  to={link.href}
                  className="text-5xl font-serif text-white hover:text-[#F44336] transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Logo with scramble
function LogoScramble() {
  const elRef = useRef(null)
  const frameRef = useRef(null)

  const scramble = useCallback(() => {
    const el = elRef.current
    if (!el) return
    const original = 'GREY'
    let iteration = 0
    clearInterval(frameRef.current)
    frameRef.current = setInterval(() => {
      el.innerText = original
        .split('')
        .map((char, i) => (i < iteration ? original[i] : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join('')
      if (iteration >= original.length) {
        clearInterval(frameRef.current)
        el.innerText = original
      }
      iteration += 0.5
    }, 40)
  }, [])

  return (
    <span
      ref={elRef}
      onMouseEnter={scramble}
      className="text-xl font-serif font-bold tracking-widest text-white hover:text-[#F44336] transition-colors duration-300 cursor-pointer"
    >
      GREY
    </span>
  )
}
