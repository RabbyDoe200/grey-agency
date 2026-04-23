import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Ideas from './pages/Ideas'
import IdeaDetail from './pages/IdeaDetail'
import Locations from './pages/Locations'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Podcasts from './pages/Podcasts'
import Legal from './pages/Legal'
import CookiePolicy from './pages/CookiePolicy'
import NotFound from './pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:slug" element={<IdeaDetail />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
