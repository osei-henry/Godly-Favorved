import { motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { services } from '../Data/clinic'

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-brand-100/60 blur-3xl"
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
            {t('services.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">{t('services.subtitle')}</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ id, icon: Icon }, i) => (
            <motion.article
              key={id}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-500/15"
            >
              {/* Top bar that draws on hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-500 transition-transform duration-500 group-hover:scale-x-100" />

              {/* Big faded number */}
              <span className="absolute right-5 top-3 font-display text-6xl font-bold text-brand-100 transition-colors duration-300 group-hover:text-accent-500/20">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="size-7 shrink-0" />
              </span>

              <h3 className="mt-6 text-xl font-bold text-brand-900">
                {t(`services.items.${id}.title`)}
              </h3>
              <p className="mt-2 leading-relaxed text-ink/70">
                {t(`services.items.${id}.text`)}
              </p>

              <a
                href="#booking"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-500 transition-colors hover:text-accent-600"
              >
                {t('nav.bookNow')}
                <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
