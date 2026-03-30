import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Interaction Demos | Jay Kadam',
  description:
    'A curated library of polished web interaction demos — animations, gestures, and UI patterns built for developers.',
  keywords: ['interaction demos', 'web animations', 'motion', 'UI patterns', 'developer demos'],
  openGraph: {
    title: 'Interaction Demos | Jay Kadam',
    description: 'Polished web interaction demos for developers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {/* Global Navigation Pill */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl border border-white/10 text-sans">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide">
            Pricing Demo
          </Link>
          <div className="w-px h-4 bg-white/20"></div>
          <Link href="/chat-demo" className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide">
            Chat Demo
          </Link>
        </div>
      </body>
    </html>
  )
}


