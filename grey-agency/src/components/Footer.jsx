import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          {/* Brand */}
          <div>
            <Link to="/">
              <span className="text-5xl font-serif font-bold tracking-widest text-white hover:text-[#F44336] transition-colors duration-300">
                GREY
              </span>
            </Link>
            <p className="mt-3 text-xs tracking-[0.3em] uppercase text-white/40">
              Famously Effective
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-widest uppercase text-white/30 mb-1">Navigate</p>
              {[
                { label: 'About', href: '/about' },
                { label: 'Ideas', href: '/ideas' },
                { label: 'Locations', href: '/locations' },
                { label: 'News', href: '/news' },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-widest uppercase text-white/30 mb-1">More</p>
              <Link
                to="/podcasts"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Podcasts
              </Link>
              <Link
                to="/legal"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Legal
              </Link>
              <a
                href="mailto:hello@grey.com"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                hello@grey.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Grey Group. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Part of WPP — 25 studios in 18 markets
          </p>
        </div>
      </div>
    </footer>
  )
}
