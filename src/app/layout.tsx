import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LocalMarket - Your Hyperlocal Marketplace',
  description: 'Find local shops and products in your area. Connect with nearby electronics stores, battery shops, and more. Get the best deals from verified local businesses.',
  keywords: 'local marketplace, electronics, batteries, mobile phones, laptops, local shops, hyperlocal, nearby stores',
  authors: [{ name: 'LocalMarket Team' }],
  creator: 'LocalMarket',
  publisher: 'LocalMarket',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localmarket.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LocalMarket - Your Hyperlocal Marketplace',
    description: 'Find local shops and products in your area. Connect with nearby electronics stores, battery shops, and more.',
    url: 'https://localmarket.com',
    siteName: 'LocalMarket',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LocalMarket - Find Local Shops and Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocalMarket - Your Hyperlocal Marketplace',
    description: 'Find local shops and products in your area. Connect with nearby electronics stores, battery shops, and more.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}