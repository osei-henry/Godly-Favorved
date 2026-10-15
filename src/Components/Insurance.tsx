import { motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { cards, clinic, insurers } from '../Data/clinic'

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const pop: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

// One style per accepted card (names must match the `cards` list in clinic.ts)
const cardStyles = {
  Visa: { bg: 'from-brand-600 to-brand-900', text: 'text-white', Icon: CreditCard },
  Mastercard: { bg: 'from-accent-500 to-brand-900', text: 'text-white', Icon: CreditCard },
  'GhIPSS gh-link': { bg: 'from-brand-500 to-accent-600', text: 'text-white', Icon: CreditCard },
  'MTN MoMo': { bg: 'from-yellow-300 to-amber-500', text: 'text-ink', Icon: Smartphone },
} as const satisfies Record<
  (typeof cards)[number],
  { bg: string; text: string; Icon: LucideIcon }
>

function initials(name: string) {
  const words = name.split(' ')
  return (
    words.length > 1
      ? words
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
      : name.slice(0, 2)
  ).toUpperCase()
}

const whatsappLink = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
  'Hello, I would like to ask about insurance coverage.',
)}`

export default function Insurance() {
  const { t } = useTranslation()

  return (
    <section
      id="insurance"
      className="relative scroll-mt-20 overflow-hidden bg-brand-50 py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-accent-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 size-96 rounded-full bg-brand-200/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold leading-tight text-balance text-brand-900 sm:text-5xl">
            {t('insurance.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">{t('insurance.subtitle')}</p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Insurers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-brand-100 bg-white p-7 shadow-sm"
          >
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-brand-900">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <ShieldCheck className="size-6" />
              </span>
              {t('insurance.insurers')}
            </h3>

            <motion.ul
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {insurers.map((name) => (
                <motion.li
                  key={name}
                  variants={pop}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="group flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-3.5 transition-colors hover:border-brand-500 hover:bg-white hover:shadow-lg hover:shadow-brand-500/10"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-extrabold text-white transition-transform duration-300 group-hover:rotate-6">
                    {initials(name)}
                  </span>
                  <span className="font-semibold text-brand-900">{name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-brand-100 bg-white p-7 shadow-sm"
          >
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-brand-900">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-500/10 text-accent-500">
                <CreditCard className="size-6" />
              </span>
              {t('insurance.cards')}
            </h3>

            <motion.ul
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {cards.map((name) => {
                const { bg, text, Icon } = cardStyles[name]
                return (
                  <motion.li
                    key={name}
                    variants={pop}
                    whileHover={{ y: -8, rotate: -2, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={`group relative aspect-[1.6] overflow-hidden rounded-2xl bg-gradient-to-br ${bg} ${text} p-4 shadow-lg`}
                  >
                    {/* Shine sweep */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        {/* Card chip */}
                        <span className="h-7 w-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-90" />
                        <Icon className="size-6 opacity-80" />
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.25em] opacity-70">
                          •••• •••• ••••
                        </p>
                        <p className="mt-1 font-bold">{name}</p>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        </div>

        {/* WhatsApp note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-brand-700 to-brand-900 p-7 text-center text-white shadow-xl shadow-brand-900/20 sm:flex-row sm:text-left"
        >
          <p className="max-w-2xl text-base font-medium leading-relaxed sm:text-lg">{t('insurance.note')}</p>
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/30"
          >
            <MessageCircle className="size-5 shrink-0" />
            {t('booking.submit')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
