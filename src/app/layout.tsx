import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    default: 'ProjectXJ — Демо-сайты для бизнеса',
    template: '%s | ProjectXJ',
  },
  description:
    'Показываем как может выглядеть сайт для вашей ниши. Барбершоп, автосервис, стоматология, салон красоты, репетитор, кофейня.',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: BASE_URL,
    siteName: 'ProjectXJ',
    title: 'ProjectXJ — Демо-сайты для бизнеса',
    description:
      'Показываем как может выглядеть сайт для вашей ниши. Барбершоп, автосервис, стоматология, салон красоты, репетитор, кофейня.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProjectXJ — Демо-сайты для бизнеса',
    description:
      'Показываем как может выглядеть сайт для вашей ниши.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
