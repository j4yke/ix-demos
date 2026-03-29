import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  )
}


