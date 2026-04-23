import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import NewsCard from '../components/NewsCard'
import { news } from '../data/news'

const categories = ['All', ...Array.from(new Set(news.map((n) => n.category)))]

export default function News() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? news : news.filter((n) => n.category === filter)

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-10 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-4"
          >
            Here and Now
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white mb-12"
          >
            News
          </motion.h1>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border transition-all duration-200 ${
                  filter === c
                    ? 'bg-[#F44336] border-[#F44336] text-black font-medium'
                    : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News list */}
      <section className="px-6 md:px-10 pb-32 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((item, i) => (
                <NewsCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-white/30 py-20 text-sm tracking-widest uppercase">
              No results
            </p>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
