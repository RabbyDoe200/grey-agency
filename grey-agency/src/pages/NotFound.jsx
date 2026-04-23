import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-black text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-6"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-6xl md:text-8xl font-serif text-white mb-8"
        >
          Lost?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-white/40 mb-10 max-w-sm"
        >
          This page doesn't exist. But great ideas do — let's find one.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-black bg-[#c8a96e] hover:bg-white px-8 py-4 transition-all duration-300 group"
          >
            Back Home
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  )
}
