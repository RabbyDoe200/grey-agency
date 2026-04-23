import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const capabilities = [
  {
    title: 'Advertising + Communications',
    description:
      'Instead of just doing what clients ask, we dig deeper to understand the real business problems they\'re facing. Then, we come up with creative solutions that actually fix those problems. We make sure your message is clear and consistent everywhere your customers see it.',
    image: 'https://images.ctfassets.net/faxemkcsc5vu/2X5sQGiKAk4EeUpECzpYMc/e6f2af5ee6d49be106bf955939e5e783/For_every_moment_hero_image.jpg?w=800&q=80&fm=webp',
  },
  {
    title: 'AI',
    description:
      'Throughout the entire creative process, we combine human and AI brains to rapidly identify, validate and apply insights to ensure those meaningful ideas are not only meaningful and impactful, but also distinctive and attention-grabbing.',
    image: 'https://images.ctfassets.net/faxemkcsc5vu/4GBEbBRkmL67da4iU18MuQ/c9e9d85ef201b23a6c8d4f823954a398/CocaCola_Print_German-Urdu.png?w=800&q=80&fm=webp',
  },
  {
    title: 'Production with Speed + Precision',
    description:
      'Our production approach is centered on delivering bold, creative, and strategic solutions that move brands forward. We merge scale with cutting-edge technology, ensuring operational excellence, cost efficiency, and fast execution — all without compromising on quality or craft.',
    image: 'https://images.ctfassets.net/faxemkcsc5vu/6V3bNjlvIfNed5S9rtNB5E/4713a40e4cda5a872ecacdb4c74316df/slack-imgs.jpg?w=800&q=80&fm=webp',
  },
  {
    title: 'Design',
    description:
      'We apply design thinking, creativity and stunning craft to identify and address customer needs, solving problems and unlocking new opportunities. Our expertise encompasses visual identity, product design, communications strategy, and experience design.',
    image: 'https://images.ctfassets.net/faxemkcsc5vu/1thiP164x4uneNRKTvKN98/52a9fda02223687f0e6041b167858dac/CloseUp_Mango_Red_03.jpeg?w=800&q=80&fm=webp',
  },
]

function CapabilityRow({ cap, index }) {
  const isEven = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-0 items-stretch ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
        <img
          src={cap.image}
          alt={cap.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center p-10 md:p-16 bg-[#0f0f0f] border border-white/5">
        <span className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-4">
          0{index + 1}
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-snug">
          {cap.title}
        </h3>
        <p className="text-white/50 leading-relaxed text-sm md:text-base">
          {cap.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-10 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-6"
          >
            About Grey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight max-w-4xl mb-10"
          >
            Hello!
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl space-y-6 text-white/60 leading-relaxed"
          >
            <p>
              We're Grey, a global collective of creative entrepreneurs with one mission: to build Famously Effective ideas that deliver growth because they solve real business problems and make brands stand out in culture in a positive way.
            </p>
            <p>
              We don't just show up; we lead. We deliver ideas that break into new markets, build cultural relevance, and set brands up to own the future. Wherever we play, we turn momentum into movement, shaping culture, not chasing it.
            </p>
            <p>
              For over 100 years, we've been smashing the old rules. Forget choosing between famous or effective. At Grey, we deliver both. Because in today's world, brands need to be unforgettable and unstoppable.
            </p>
          </motion.div>
          <motion.a
            href="mailto:hello@grey.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 inline-flex items-center gap-3 text-sm tracking-widest uppercase text-[#F44336] hover:text-white transition-colors duration-300 group"
          >
            hello@grey.com
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Capabilities */}
      <section className="bg-black">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-16"
          >
            Famously Effective, Culture-Driving Creativity
          </motion.h2>
        </div>
        <div className="space-y-px">
          {capabilities.map((cap, i) => (
            <CapabilityRow key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </section>

      {/* Beyond Borders */}
      <section className="py-32 px-6 md:px-10 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#F44336] mb-6">Beyond Borders</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
              The best of both worlds.
            </h2>
            <p className="text-white/50 leading-relaxed mb-6">
              As the smallest of the big creative agencies of our parent, WPP, we offer the vast resources of the world's largest communications company, combined with the agility to thrive in today's fast-paced environment.
            </p>
            <p className="text-white/50 leading-relaxed">
              Our global-to-local model ensures our clients have access to award-winning talent across every capability, with fully integrated teams delivering immediate insights and seamless activations. With 25 studios in 18 markets, we're perfectly sized to be incredibly nimble.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {[
              { award: 'Grand Effie', detail: 'Won in every market we operate in' },
              { award: 'Top 10 Network', detail: 'Cannes Lions International Festival of Creativity 2024' },
              { award: 'Top 100 Global Most Loved Workplace', detail: 'Newsweek 2023' },
              { award: "America's Greatest Workplaces for Women", detail: 'Newsweek 2025' },
              { award: '22 Lions', detail: 'Cannes Lions 2025 — across every region' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 border-b border-white/8 pb-6"
              >
                <span className="text-[#F44336] mt-1 text-lg">✦</span>
                <div>
                  <p className="text-white font-medium mb-1">{item.award}</p>
                  <p className="text-sm text-white/40">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
