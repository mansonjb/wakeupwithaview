import type { Metadata } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ACTIVE, HTML_LANG, hasLocale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import '../globals.css'
import 'leaflet/dist/leaflet.css'

const manrope = Manrope({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono-jb', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
}

export const dynamicParams = false
export function generateStaticParams() {
  return ACTIVE.map((lang) => ({ lang }))
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <html lang={HTML_LANG[lang]} className={`${manrope.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">{children}<script dangerouslySetInnerHTML={{ __html: "(function(s,t,a,y,twenty,two){s.Stay22=s.Stay22||{};s.Stay22.params={lmaID:'6ab4e303a86a376f95c517a0'};twenty=t.createElement(a);two=t.getElementsByTagName(a)[0];twenty.async=1;twenty.src=y;two.parentNode.insertBefore(twenty,two);})(window,document,'script','https://scripts.stay22.com/letmeallez.js');" }} /></body>
    </html>
  )
}
