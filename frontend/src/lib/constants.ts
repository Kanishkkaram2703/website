// Theme constants matching logo palette
export const THEME = {
  colors: {
    primary: '#142f2a',      // Deep industrial green
    primaryLight: '#1a423e',
    primaryDark: '#0a1815',
    accent: '#ba8d32',       // Premium gold
    accentLight: '#ecc06a',
    accentDark: '#7a5820',
    white: '#f7f7f7',
    pureWhite: '#ffffff',
    dark: '#0a1815',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210',
    defaultMessage: 'Hi, I am interested in crane services from Shivoham Crane Services. Please share details.',
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || '+91-98765-43210',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@shivohamcrane.com',
    address: 'Navi Mumbai, Maharashtra, India',
    mapUrl: 'https://maps.google.com/?q=Navi+Mumbai,Maharashtra,India',
  },
  company: {
    name: 'Shivoham Crane Services',
    tagline: 'Lifting Excellence Across India',
    description: 'Professional crane rental and heavy lifting services based in Navi Mumbai, serving clients across India with safety, precision, and reliability.',
    founded: '2026',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  },
} as const;

export const SERVICES = [
  'Mobile Crane Rental',
  'Hydra Crane Rental',
  'Heavy Lifting',
  'Machinery Shifting',
  'Erection & Dismantling',
  'Industrial Lifting',
  'Plant Maintenance Lifts',
  'Emergency / Night Lifts',
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Projects', href: '/projects' },
  { label: 'Industries', href: '/industries' },
  { label: 'Safety', href: '/safety' },
  { label: 'Contact', href: '/contact' },
] as const;
