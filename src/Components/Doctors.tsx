import { motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Stethoscope } from 'lucide-react'
import { doctors } from '../Data/clinic'

const photos: Partial<Record<string, string>> = {
  'doc-1': '/doctors/image.png',
  'doc-2': '/doctors/image2.png',
  'doc-3': '/doctors/image1.png',
}

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const tones = [
  { skin: '#5e3a22', neck: '#4b2c1a' },
  { skin: '#7b4e2f', neck: '#63391f' },
  { skin: '#4a2c19', neck: '#3a2013' },
] as const

// Illustrated placeholder portrait (replaced by a photo when one is listed above)
function Avatar({ tone }: { tone: (typeof tones)[number] }) {
  return (
    <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
      {/* White coat and blue collar */}
      <path d="M14 200 Q26 138 100 132 Q174 138 186 200 Z" fill="#ffffff" />
      <path d="M84 134 L100 172 L116 134 Z" fill="#1d4ed8" />
      {/* Neck and head */}
      <rect x="87" y="102" width="26" height="38" rx="10" fill={tone.neck} />
      <ellipse cx="100" cy="78" rx="34" ry="40" fill={tone.skin} />
      {/* Hair */}
      <path d="M65 76 Q62 34 100 32 Q138 34 135 76 Q125 50 100 50 Q75 50 65 76 Z" fill="#0d0805" />
      {/* Eyes and smile */}
      <circle cx="87" cy="80" r="3.2" fill="#0d0805" />
      <circle cx="113" cy="80" r="3.2" fill="#0d0805" />
      <path d="M88 99 Q100 108 112 99" stroke="#2a1008" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Stethoscope */}
      <path d="M76 138 Q74 178 100 180 Q126 178 124 138" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="182" r="6" fill="#dc2626" />
    </svg>
  )
}

export default function Doctors() {
  const { t } = useTranslation()

  return (
    <section
      id="doctors"
      className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 size-96 rounded-full bg-brand-100/60 blur-3xl"
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
            {t('doctors.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">{t('doctors.subtitle')}</p>
        </motion.div>

        {/* Doctor cards */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {doctors.map(({ id, name, role }, i) => {
            const photo = photos[id]
            return (
              <motion.article
                key={id}
                variants={card}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-500/15"
              >
                {/* Portrait area */}
                <div className="relative grid h-64 place-items-center overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-white">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 size-40 rounded-full bg-accent-500/15 transition-transform duration-500 group-hover:scale-150"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-12 -left-8 size-44 rounded-full bg-brand-500/15 transition-transform duration-500 group-hover:scale-150"
                  />

                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="relative size-44 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl shadow-brand-900/15"
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt={name}
                        className={`size-full object-cover ${id === 'doc-1' || id === 'doc-2' ? 'object-top' : ''}`}
                      />
                    ) : (
                      <Avatar tone={tones[i % tones.length]} />
                    )}
                  </motion.div>

                  <span className="absolute bottom-4 right-5 grid size-11 place-items-center rounded-full bg-accent-500 text-white shadow-lg shadow-accent-500/30 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <Stethoscope className="size-5" />
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-brand-900">{name}</h3>
                  <p className="mt-1 font-semibold text-accent-500">
                    {t(`doctors.roles.${role}`)}
                  </p>

                  <a
                    href="#booking"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-brand-200 px-5 py-2.5 text-sm font-bold text-brand-700 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
                  >
                    {t('nav.bookNow')}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
