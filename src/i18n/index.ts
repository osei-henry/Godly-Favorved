import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import type { Translation } from './locales/en'

const modules = import.meta.glob<Record<string, Translation>>(
  './locales/*.ts',
  { eager: true },
)

const loaded = Object.entries(modules)
  .map(([path, mod]) => {
    const code = path.split('/').pop()!.replace('.ts', '')
    return { code, translation: mod[code] }
  })
  .sort((a, b) =>
    a.code === 'en' ? -1 : b.code === 'en' ? 1 : a.code.localeCompare(b.code),
  )

export const languages = loaded.map(({ code, translation }) => ({
  code,
  label: translation.languageName,
}))

const resources = Object.fromEntries(
  loaded.map(({ code, translation }) => [code, { translation }]),
)

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: languages.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

// Keep the page's lang attribute in step with the chosen language
// (Ga is "gaa" because "ga" is the code for Irish)
const htmlLang: Record<string, string> = { ga: 'gaa' }
i18n.on('languageChanged', (lng) => {
  const code = lng.split('-')[0]
  document.documentElement.lang = htmlLang[code] ?? code
})

export default i18n
