import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { locations, regions } from '../data/locations'

function LocationCard({ loc, index, onSelect, isActive }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      onClick={() => onSelect(loc)}
      className={`group relative overflow-hidden text-left w-full focus:outline-none ${
        isActive ? 'ring-1 ring-[#F44336]' : ''
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={loc.image}
          alt={loc.city}
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {isActive && (
          <div className="absolute inset-0 bg-[#F44336]/10" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className={`font-serif text-lg leading-tight transition-colors duration-300 ${isActive ? 'text-[#F44336]' : 'text-white group-hover:text-[#F44336]'}`}>
            {loc.city}
          </p>
          <p className="text-xs text-white/50 mt-0.5">{loc.country}</p>
          {loc.role && (
            <span className="mt-1 inline-block text-xs tracking-widest uppercase text-[#F44336]/70">
              {loc.role}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

function DetailPanel({ loc, onClose }) {
  return (
    <motion.div
      key={loc.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-24 bg-[#0f0f0f] border border-white/10 overflow-hidden"
    >
      {/* Hero image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={loc.image}
          alt={loc.city}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white bg-black/40 hover:bg-black/70 transition-all duration-200 text-lg"
        >
          ×
        </button>
      </div>

      {/* Info */}
      <div className="p-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-2">{loc.region}</p>
        <h2 className="text-3xl font-serif text-white mb-1">{loc.city}</h2>
        <p className="text-white/40 text-sm mb-6">{loc.country}</p>

        {loc.role && (
          <span className="inline-block text-xs tracking-widest uppercase text-[#F44336] border border-[#F44336]/30 px-3 py-1 mb-6">
            {loc.role}
          </span>
        )}

        <div className="space-y-4">
          {loc.address && (
            <div>
              <p className="text-xs tracking-widest uppercase text-white/30 mb-1">Address</p>
              <p className="text-white/70 text-sm leading-relaxed">{loc.address}</p>
            </div>
          )}
          {loc.phone && (
            <div>
              <p className="text-xs tracking-widest uppercase text-white/30 mb-1">Phone</p>
              <a
                href={`tel:${loc.phone.replace(/\s/g, '')}`}
                className="text-white/70 text-sm hover:text-[#F44336] transition-colors duration-200"
              >
                {loc.phone}
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <a
            href="mailto:hello@grey.com"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#F44336] hover:text-white transition-colors duration-300 group"
          >
            Get in touch
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Locations() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    activeRegion === 'All'
      ? locations
      : locations.filter((l) => l.region === activeRegion)

  const handleSelect = (loc) => {
    setSelected((prev) => (prev?.id === loc.id ? null : loc))
  }

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
            {locations.length} Studios · 4 Regions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Locations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm mb-10"
          >
            Click any studio to see details.
          </motion.p>

          {/* Region tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {['All', ...regions].map((r) => (
              <button
                key={r}
                onClick={() => { setActiveRegion(r); setSelected(null) }}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border transition-all duration-200 ${
                  activeRegion === r
                    ? 'bg-[#F44336] border-[#F44336] text-black font-medium'
                    : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid + Detail panel */}
      <section className="px-6 md:px-10 pb-32 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <div className={`grid gap-6 ${selected ? 'md:grid-cols-[1fr_380px]' : ''}`}>
            {/* Cards grid */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {filtered.map((loc, i) => (
                    <LocationCard
                      key={loc.id}
                      loc={loc}
                      index={i}
                      onSelect={handleSelect}
                      isActive={selected?.id === loc.id}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Detail panel */}
            <AnimatePresence>
              {selected && (
                <DetailPanel
                  key={selected.id}
                  loc={selected}
                  onClose={() => setSelected(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Global reach banner */}
      <section className="px-6 md:px-10 pb-32 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/10 p-12 md:p-20 text-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-6">Global Reach</p>
            <p className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Wherever you are,<br />we're there.
            </p>
            <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed mb-10">
              Grey has won a Grand Effie in every market we operate in. Our global-to-local model
              ensures clients have access to award-winning talent across every capability.
            </p>
            <a
              href="mailto:hello@grey.com"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-black bg-[#F44336] hover:bg-white px-8 py-4 transition-all duration-300 font-medium group"
            >
              Say Hello
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
