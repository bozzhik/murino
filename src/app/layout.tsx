import type {Metadata} from 'next'
import localFont from 'next/font/local'
import './globals.css'

const SuisseIntl = localFont({
  src: [
    {
      path: '../assets/fonts/SuisseIntl-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/SuisseIntl-Book.woff2',
      weight: '450',
    },
    {
      path: '../assets/fonts/SuisseIntl-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/SuisseIntl-SemiBold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-suisseintl',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://murino-arena.ru'),
  title: {
    default: 'МУРИНО АРЕНА',
    template: '%s — МУРИНО АРЕНА',
  },
  description: 'Мурино Арена — один из самых масштабных футбольных шатров в Санкт-Петербурге и Ленинградской области!',
  generator: 'nextjs, react, landing page',
  keywords: 'мурино, мурино арена, мурино футбол, мурино футбольное поле, мурино футбольный шатер',

  openGraph: {
    type: 'website',
    url: 'https://murino-arena.ru',
    title: 'МУРИНО АРЕНА',
    description: 'Мурино Арена — один из самых масштабных футбольных шатров в Санкт-Петербурге и Ленинградской области!',
    siteName: 'МУРИНО АРЕНА',
    images: 'https://murino-arena.ru/og.jpg',
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
}

import Header from '#/Global/Header/Header'
import YandexMetrica from '#/Global/Analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${SuisseIntl.variable} font-sans tracking-tighter`}>
        <Header />
        {children}

        {process.env.NODE_ENV === 'production' && <YandexMetrica />}
      </body>
    </html>
  )
}
