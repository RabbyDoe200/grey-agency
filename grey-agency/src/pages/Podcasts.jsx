import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const podcasts = [
  {
    title: "What feeds Chef Akshay Bhardwaj's passion?",
    description:
      "For Executive Chef Akshay Bhardwaj, becoming a chef was not always the plan. It took perseverance and a little bit of defiance for him to rise in the ranks and become the Executive Chef of Junoon — at one time the only Michelin Star restaurant in New York City serving Indian food.",
    spotify: 'https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp',
    apple: 'https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982',
  },
  {
    title: 'Where does Cyndie Spiegel find Microjoys?',
    description:
      "For A Year of Positive Thinking author Cyndie Spiegel, writing her second book came after a year of personal struggle and loss in 2020. Yet, she still found moments of joy and documented them in Microjoys: Finding Hope (Especially) When Life Is Not Okay.",
    spotify: 'https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp',
    apple: 'https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982',
  },
  {
    title: 'What led Arielle Assouline-Lichten to build Slash Objects?',
    description:
      "Arielle Assouline-Lichten's dream was to create a furniture design studio that creates social change — that's what led her to start Slash Objects, an award-winning, sustainable design studio.",
    spotify: 'https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp',
    apple: 'https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982',
  },
  {
    title: 'Why did Rob Herting press play on QCODE?',
    description:
      'Rob Herting saw a void within the podcast space where nobody else did — cinematic quality audio fiction. After leaving his job at a talent agency, he became the CEO and founder of QCODE, an audio-based production studio.',
    spotify: 'https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp',
    apple: 'https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982',
  },
  {
    title: 'How did Dr. Zach Thomas grow his channel on YouTube?',
    description:
      'Now a podiatrist, Zach runs the YouTube channel Foot Doctor Zach, where he reviews the latest performance shoe tech and breaks down the most advanced shoes for athletes — with over 100,000 subscribers.',
    spotify: 'https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp',
    apple: 'https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982',
  },
  {
    title: 'How did Gavin McIntyre grow Ecovative from the ground up?',
    description:
      "What started as a classroom project and a passion for helping the planet is now an audacious goal of ending the world's dependency on plastics through the mycelium materials company, Ecovative.",
    spotify: 'https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp',
    apple: 'https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982',
  },
]

function PodcastCard({ pod, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="border border-white/10 p-8 hover:border-[#F44336]/30 transition-colors duration-300 group"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#F44336]/10 flex items-center justify-center shrink-0 mt-1">
          <span className="text-[#F44336] text-sm">▶</span>
        </div>
        <h3 className="text-white font-serif text-lg leading-snug group-hover:text-[#F44336] transition-colors duration-300">
          {pod.title}
        </h3>
      </div>
      <p className="text-white/50 text-sm leading-relaxed mb-6">{pod.description}</p>
      <div className="flex gap-4">
        <a
          href={pod.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-white/40 hover:text-[#F44336] transition-colors duration-200 border border-white/10 hover:border-[#F44336]/40 px-4 py-2"
        >
          Spotify
        </a>
        <a
          href={pod.apple}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-white/40 hover:text-[#F44336] transition-colors duration-200 border border-white/10 hover:border-[#F44336]/40 px-4 py-2"
        >
          Apple Podcasts
        </a>
      </div>
    </motion.div>
  )
}

export default function Podcasts() {
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
            A Podcast About Ideas
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            GreyMatter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl leading-relaxed"
          >
            The Webby Award-winning podcast where Grey talks to the world's most innovative creators,
            founders, and inventors about how their best ideas came to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mt-8"
          >
            <a
              href="https://open.spotify.com/show/1rFM18xbbs7lRop9JEdaWp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-black bg-[#F44336] hover:bg-white px-6 py-3 transition-all duration-300 font-medium"
            >
              Listen on Spotify
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/grey-matter-a-podcast-about-ideas/id1476735982"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-white border border-white/20 hover:border-[#F44336] hover:text-[#F44336] px-6 py-3 transition-all duration-300"
            >
              Apple Podcasts
            </a>
          </motion.div>
        </div>
      </section>

      {/* Episodes */}
      <section className="px-6 md:px-10 pb-32 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <div className="h-px bg-gradient-to-r from-[#F44336]/30 to-transparent mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((pod, i) => (
              <PodcastCard key={i} pod={pod} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
