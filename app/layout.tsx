import type { Metadata } from 'next'
import { Poppins, Inter, Cairo } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'EcoMate — The All-in-One SaaS for Algerian Business',
  description: 'EcoMate centralizes every tool Algerian SMEs need — AI chatbot, order management, CRM, and AI-powered client acquisition.',
  keywords: 'ecomate, algerie, saas, ecommerce, chatbot, ia',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()
  const isArabic = locale === 'ar'

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'} data-theme="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} ${cairo.variable} ${isArabic ? 'font-cairo' : 'font-inter'}`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0a1628',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.08)',
              },
            }}
          />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
