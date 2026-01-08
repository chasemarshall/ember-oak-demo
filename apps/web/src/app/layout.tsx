import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#FAF7F2',
}

export const metadata: Metadata = {
  title: {
    default: 'Ember & Oak Coffee | Portland, Oregon',
    template: '%s | Ember & Oak Coffee',
  },
  description:
    'Neighborhood coffee shop in Portland, Oregon. House-roasted beans, local ingredients, and a space to slow down. Division Street & Alberta Arts District.',
  keywords: [
    'coffee shop',
    'Portland',
    'Oregon',
    'espresso',
    'cafe',
    'Division Street',
    'Alberta Arts',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ember & Oak Coffee',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased pt-[calc(4rem+env(safe-area-inset-top))]">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
