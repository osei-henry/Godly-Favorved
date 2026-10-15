import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a moment for the page to render, then scroll to the section
      const id = decodeURIComponent(hash.slice(1))
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash, key])

  return null
}