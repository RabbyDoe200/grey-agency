import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const sections = [
  {
    heading: 'What Are Cookies?',
    content:
      'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies allow us to recognise your device and store some information about your preferences or past actions.',
  },
  {
    heading: 'How We Use Cookies',
    content:
      'We use cookies to understand how visitors interact with our website, to remember your preferences, and to improve your overall experience. Some cookies are essential for the website to function properly, while others help us analyse site traffic and usage patterns so we can improve our services.',
  },
  {
    heading: 'Types of Cookies We Use',
    content:
      'Strictly necessary cookies are required for the website to function and cannot be switched off. Performance cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. Functional cookies enable the website to provide enhanced functionality and personalisation. Targeting cookies may be set through our site by our advertising partners to build a profile of your interests.',
  },
  {
    heading: 'Third-Party Cookies',
    content:
      'In some cases, we use cookies provided by trusted third parties. For example, this site uses analytics services which help us understand how you use the site, and how we can improve your experience. These third-party services may also use cookies for their own purposes in accordance with their own privacy policies.',
  },
  {
    heading: 'Managing Cookies',
    content:
      'You can control and manage cookies in various ways. Most browsers allow you to refuse or accept cookies, delete cookies, and be notified when a cookie is set. Please note that if you choose to block or delete cookies, some features of our website may not function correctly. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.aboutcookies.org or www.allaboutcookies.org.',
  },
  {
    heading: 'Changes to This Policy',
    content:
      'We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.',
  },
  {
    heading: 'Contact Us',
    content:
      'If you have any questions about our use of cookies or this Cookie Policy, please contact us at privacy@grey.com.',
  },
]

export default function CookiePolicy() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-10 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <Link
            to="/legal"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 hover:text-[#c8a96e] transition-colors duration-300 mb-8 block"
          >
            ← Terms of Service
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-4"
          >
            Grey Group
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Cookie Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm max-w-xl leading-relaxed"
          >
            This policy explains how Grey Global Group uses cookies and similar technologies
            when you visit our website.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-10 pb-32 bg-black">
        <div className="max-w-screen-md mx-auto space-y-12">
          <div className="h-px bg-gradient-to-r from-[#c8a96e]/30 to-transparent" />
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.04 * i }}
            >
              <h2 className="text-lg font-serif text-white mb-4">{sec.heading}</h2>
              <p className="text-white/55 leading-relaxed text-sm md:text-base">{sec.content}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
