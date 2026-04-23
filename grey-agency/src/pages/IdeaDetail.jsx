import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import { ideas } from '../data/ideas'

export default function IdeaDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Match by the last segment of the slug field
  const idea = ideas.find((i) => i.slug === `/ideas/${slug}`)

  useEffect(() => {
    if (!idea) navigate('/ideas', { replace: true })
  }, [idea, navigate])

  if (!idea) return null

  const currentIndex = ideas.findIndex((i) => i.id === idea.id)
  const prev = ideas[currentIndex - 1] || null
  const next = ideas[currentIndex + 1] || null

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <motion.img
          src={idea.gallery?.[0] || idea.image}
          alt={idea.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${idea.color}dd 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.2) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-3"
          >
            {idea.client}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight max-w-4xl mb-4"
          >
            {idea.heroHeadline || idea.title}
          </motion.h1>
          {idea.awards && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-xs tracking-widest uppercase text-[#c8a96e]/80"
            >
              {idea.awards}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Back breadcrumb ── */}
      <div className="bg-black px-6 md:px-16 pt-10 pb-2">
        <Link
          to="/ideas"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 hover:text-[#c8a96e] transition-colors duration-300"
        >
          ← All Ideas
        </Link>
      </div>

      {/* ── Body ── */}
      <section className="bg-black px-6 md:px-16 py-16">
        <div className="max-w-screen-lg mx-auto grid md:grid-cols-[1fr_2fr] gap-16">
          {/* Left — meta */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-2">Client</p>
              <p className="text-white font-serif text-lg">{idea.client}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-2">Campaign</p>
              <p className="text-white font-serif text-lg">{idea.title}</p>
            </div>
            {idea.awards && (
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-2">Recognition</p>
                <p className="text-white/60 text-sm leading-relaxed">{idea.awards}</p>
              </div>
            )}
          </div>

          {/* Right — copy */}
          <div>
            <p className="text-white/60 leading-relaxed text-base md:text-lg mb-10 whitespace-pre-line">
              {idea.body}
            </p>

            {idea.subheadline && (
              <>
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-snug">
                  {idea.subheadline}
                </h2>
                <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4">
                  Famously Effective
                </p>
                <p className="text-white/50 leading-relaxed text-sm md:text-base">
                  {idea.effectiveness}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {idea.gallery && idea.gallery.length > 1 && (
        <section className="bg-[#0a0a0a] px-6 md:px-16 py-16">
          <div className="max-w-screen-lg mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-10">Gallery</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {idea.gallery.slice(1).map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="overflow-hidden aspect-[4/3]"
                >
                  <img
                    src={src}
                    alt={`${idea.title} — ${i + 2}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Press quotes ── */}
      {idea.quotes && idea.quotes.length > 0 && (
        <section className="bg-black px-6 md:px-16 py-16">
          <div className="max-w-screen-lg mx-auto space-y-8">
            {idea.quotes.map((q, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-2 border-[#c8a96e] pl-6"
              >
                <p className="text-white/70 italic text-base md:text-lg leading-relaxed mb-2">
                  "{q.text}"
                </p>
                <cite className="text-xs tracking-widest uppercase text-[#c8a96e]/70 not-italic">
                  — {q.source}
                </cite>
              </motion.blockquote>
            ))}
          </div>
        </section>
      )}

      {/* ── Prev / Next navigation ── */}
      <section className="bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2">
          {prev ? (
            <Link
              to={prev.slug}
              className="group flex flex-col gap-2 p-8 md:p-12 border-r border-white/5 hover:bg-white/3 transition-colors duration-300"
            >
              <span className="text-xs tracking-widest uppercase text-white/30 group-hover:text-[#c8a96e] transition-colors duration-300">
                ← Previous
              </span>
              <span className="text-white font-serif text-lg leading-snug group-hover:text-[#c8a96e] transition-colors duration-300">
                {prev.title}
              </span>
              <span className="text-xs text-white/30">{prev.client}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={next.slug}
              className="group flex flex-col gap-2 p-8 md:p-12 text-right hover:bg-white/3 transition-colors duration-300"
            >
              <span className="text-xs tracking-widest uppercase text-white/30 group-hover:text-[#c8a96e] transition-colors duration-300">
                Next →
              </span>
              <span className="text-white font-serif text-lg leading-snug group-hover:text-[#c8a96e] transition-colors duration-300">
                {next.title}
              </span>
              <span className="text-xs text-white/30">{next.client}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </PageTransition>
  )
}
