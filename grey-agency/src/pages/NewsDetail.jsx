import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import { news } from '../data/news'

export default function NewsDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const item = news.find((n) => n.slug === `/news/${slug}`)

  useEffect(() => {
    if (!item) navigate('/news', { replace: true })
  }, [item, navigate])

  if (!item) return null

  const date = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const currentIndex = news.findIndex((n) => n.id === item.id)
  const prev = news[currentIndex - 1] || null
  const next = news[currentIndex + 1] || null

  return (
    <PageTransition>
      {/* ── Hero image ── */}
      {item.image && (
        <section className="relative h-[55vh] min-h-[360px] overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        </section>
      )}

      {/* ── Header ── */}
      <section className={`bg-black px-6 md:px-16 ${item.image ? 'pt-12' : 'pt-40'} pb-12`}>
        <div className="max-w-screen-md mx-auto">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 hover:text-[#F44336] transition-colors duration-300 mb-8 block"
          >
            ← All News
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-xs tracking-widest uppercase text-[#F44336] font-medium">
              {item.category}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-xs text-white/30">{date}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-serif text-white leading-tight"
          >
            {item.title}
          </motion.h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-black px-6 md:px-16 pb-20">
        <div className="max-w-screen-md mx-auto">
          <div className="h-px bg-gradient-to-r from-[#F44336]/40 to-transparent mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {item.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-white/65 leading-relaxed mb-6 text-base md:text-lg">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Gallery */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.gallery.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="overflow-hidden aspect-video"
                >
                  <img
                    src={src}
                    alt={`${item.title} — ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Prev / Next ── */}
      <section className="bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2">
          {prev ? (
            <Link
              to={prev.slug}
              className="group flex flex-col gap-2 p-8 md:p-12 border-r border-white/5 hover:bg-white/3 transition-colors duration-300"
            >
              <span className="text-xs tracking-widest uppercase text-white/30 group-hover:text-[#F44336] transition-colors duration-300">
                ← Previous
              </span>
              <span className="text-white font-serif text-base leading-snug group-hover:text-[#F44336] transition-colors duration-300">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={next.slug}
              className="group flex flex-col gap-2 p-8 md:p-12 text-right hover:bg-white/3 transition-colors duration-300"
            >
              <span className="text-xs tracking-widest uppercase text-white/30 group-hover:text-[#F44336] transition-colors duration-300">
                Next →
              </span>
              <span className="text-white font-serif text-base leading-snug group-hover:text-[#F44336] transition-colors duration-300">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </PageTransition>
  )
}
