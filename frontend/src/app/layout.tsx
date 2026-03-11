import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatAssistant } from '@/components/ui/ChatAssistant';
import { GsapProvider } from '@/components/ui/GsapProvider';
import { StructuredData } from '@/components/seo/StructuredData';
import { AnalyticsPlaceholder } from '@/components/seo/AnalyticsPlaceholder';

const heading = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shivohamcrane.com'),
  icons: {
    icon: '/logo/logo.png',
    shortcut: '/logo/logo.png',
    apple: '/logo/logo.png',
  },
  title: {
    default: 'Shivoham Crane Services | Crane Rental & Heavy Lifting | Navi Mumbai, India',
    template: '%s | Shivoham Crane Services',
  },
  description:
    'Professional crane rental and heavy lifting services based in Navi Mumbai. Mobile cranes, hydra cranes, industrial lifting, machinery shifting & more. Pan-India service with safety-first approach.',
  keywords: [
    'crane rental Navi Mumbai',
    'crane services India',
    'mobile crane rental',
    'hydra crane rental',
    'heavy lifting services',
    'industrial crane hire',
    'machinery shifting Navi Mumbai',
    'crane operators India',
    'Shivoham Crane Services',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shivoham Crane Services',
    title: 'Shivoham Crane Services | Crane Rental & Heavy Lifting',
    description:
      'Professional crane rental and heavy lifting services based in Navi Mumbai, serving clients across India.',
    images: [{ url: '/images/logo.png', width: 1110, height: 1376, alt: 'Shivoham Crane Services Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivoham Crane Services | Crane Rental & Heavy Lifting',
    description:
      'Professional crane rental and heavy lifting services based in Navi Mumbai, serving clients across India.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <GsapProvider>
          <StructuredData />
          <AnalyticsPlaceholder />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatAssistant />
        </GsapProvider>
      </body>
    </html>
  );
}
