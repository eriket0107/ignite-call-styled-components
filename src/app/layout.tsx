import { Roboto } from 'next/font/google'
import { Provider } from './providers'
import { Metadata } from 'next'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Ignite Call',
    template: '%s  | Ignite Call',
    absolute: 'Bem vindo | Ignite Call',
  },
  description: 'Schedule your tasks and compromises',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ignite-call-eriket.com.br',
    siteName: 'Ignite Call Eriket',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  )
}
