import {
  Baby,
  Eye,
  Glasses,
  ScanEye,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export const clinic = {
  name: 'Godly Favored Eye Clinic',
  whatsappNumber: '233550207703', // used for the booking link (no + sign)
  phoneDisplay: '+233 55 020 7703',
  address: 'Abeka Junction, Lapaz opposite the Papaye restuarant',
  hours: [
    { days: 'Mon – Fri', time: '8:00 AM – 8:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
} as const

// The ids match the keys in services.items inside each locale file.
export const services = [
  { id: 'exam', icon: ScanEye },
  { id: 'glasses', icon: Glasses },
  { id: 'contacts', icon: Eye },
  { id: 'cataract', icon: Sparkles },
  { id: 'pediatric', icon: Baby },
  { id: 'glaucoma', icon: ShieldCheck },
] as const satisfies readonly { id: string; icon: LucideIcon }[]

export type ServiceId = (typeof services)[number]['id']

export const insurers = [
  'NHIS',
  'GLICO Healthcare',
  'Acacia Health',
  'Nationwide Medical',
  'Metropolitan Health',
  'Premier Health',
] as const

export const cards = [
  'Visa',
  'Mastercard',
  'GhIPSS gh-link',
  'MTN MoMo',
] as const

// The role matches the keys in doctors.roles inside each locale file.
export const doctors = [
  { id: 'doc-1', name: 'Dr. Kwame Mensah', role: 'ophthalmologist' },
  { id: 'doc-2', name: 'Dr. Ama Boateng', role: 'optometrist' },
  { id: 'doc-3', name: 'Dr. Kofi Owusu', role: 'pediatric' },
] as const satisfies readonly {
  id: string
  name: string
  role: 'ophthalmologist' | 'optometrist' | 'pediatric'
}[]

export const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
] as const