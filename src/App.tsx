import { Route, Routes } from 'react-router'
import { MotionConfig } from 'motion/react'
import { Toaster } from 'react-hot-toast'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import WhatsAppButton from './Components/WhatsAppButton'
import ScrollManager from './Components/ScrollManager'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Toaster position="top-center" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
