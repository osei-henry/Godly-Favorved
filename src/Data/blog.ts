import {
  CalendarDays,
  Camera,
  HeartPulse,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { Category } from './posts'

export const categoryMeta = {
  partners: { icon: Users, gradient: 'from-brand-500 to-brand-700' },
  health: { icon: HeartPulse, gradient: 'from-accent-500 to-accent-600' },
  events: { icon: CalendarDays, gradient: 'from-brand-600 to-accent-500' },
  gallery: { icon: Camera, gradient: 'from-brand-700 to-brand-900' },
} as const satisfies Record<Category, { icon: LucideIcon; gradient: string }>

const dateLocales: Record<string, string> = {
  en: 'en-GB',
  tw: 'en-GB',
  ga: 'en-GB',
  ha: 'ha',
  fr: 'fr',
}

export function formatDate(iso: string, lang: string) {
  return new Intl.DateTimeFormat(dateLocales[lang] ?? 'en-GB', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(iso))
}
