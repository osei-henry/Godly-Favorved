import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { clinic } from '../Data/clinic'

const link = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${clinic.name}, I have a question.`,
)}`

export default function WhatsAppButton() {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.12, rotate: -8 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 sm:bottom-7 sm:right-7 sm:size-16"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />
      <MessageCircle className="relative size-7 sm:size-8" />
    </motion.a>
  )
}