import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const sections = [
  {
    heading: 'Grey Group Privacy Notice',
    content:
      'This website is operated by Grey Global Group ("Grey", "We", "Us"), a WPP Company. We take the privacy of our website users and the security of their personal information very seriously and are committed to best practices. The purpose of this privacy policy is to set out the principles governing our use of personal information that we may obtain about you.',
  },
  {
    heading: 'Third Party Solicitation',
    content:
      'It has come to our attention that the Grey name has been fraudulently used by third parties — often communicating via messaging services — on unofficial websites and apps, sometimes involving the false offer of employment with Grey. Any websites or apps claiming a connection to Grey that encourage people to pay membership fees or provide personal and/or financial information are fraudulent. We will never interview prospective candidates via instant message or group chat, nor do we require candidates to purchase products or services, or process payments on our behalf as a condition of any employment offer. Please be vigilant against such scams and report them to the appropriate authorities.',
  },
  {
    heading: 'Personal Information Collection and Use',
    content:
      'At times, we may request that you voluntarily supply us with personal information, or you may choose to provide us with your personal information by emailing us via the "Contact" section of this website. Generally, this information is requested or provided when you want us to provide you with information. We may collect: name, address, email address, telephone number, IP address, mobile device ID, and other personal information provided when contacting us.',
  },
  {
    heading: 'How We Use Your Information',
    content:
      'We use your personal information to provide you with materials and information you requested; to send you information and materials that may be of interest to you; to respond to specific queries you may raise regarding Grey; to provide you with better ways of accessing information on this website; and to process and consider your queries and requests such as those submitted via the "Contact" and "Careers" sections.',
  },
  {
    heading: 'Sharing Your Information',
    content:
      'We may send your personal information to other Grey and WPP group companies, affiliates and third parties to help us process your personal information for the purposes set out in this notice. We may disclose your personal information if we or any of our assets are the subject of a sale or similar corporate transaction. We will ensure that the third parties who receive your personal information are required to keep it confidential.',
  },
  {
    heading: 'Security',
    content:
      'We take appropriate technical and organizational measures to ensure that your personal information disclosed to us is kept secure, accurate and up to date and kept only for so long as is necessary for the purposes for which it is used. This website is not intended or designed to attract children under the age of 16. We do not knowingly collect personal information from or about any person under the age of 16.',
  },
  {
    heading: 'Your Rights',
    content:
      'You are entitled to ask for a copy of the personal information we hold about you; to have any inaccuracies in your personal information corrected; and to have your personal information erased, or for our use of it to be restricted. Please contact us at privacy@grey.com if you would like to exercise any of these rights.',
  },
  {
    heading: 'Contact',
    content:
      'If you wish to exercise any of your rights in relation to your personal information or if you have any queries about how we use your personal information, please let us know by emailing privacy@grey.com.',
  },
]

export default function Legal() {
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
            Grey Group
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            {/* Internal link — no external redirect */}
            <Link
              to="/legal/cookie-policy"
              className="text-xs tracking-widest uppercase text-[#F44336] hover:text-white border border-[#F44336]/30 hover:border-white/30 px-4 py-2 transition-all duration-200"
            >
              Cookie Policy →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-10 pb-32 bg-black">
        <div className="max-w-screen-md mx-auto space-y-12">
          <div className="h-px bg-gradient-to-r from-[#F44336]/30 to-transparent" />
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
