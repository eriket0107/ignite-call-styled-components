import { Roboto } from 'next/font/google'
import { Provider } from './providers'
import { Metadata } from 'next'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ignite Call',
  description: 'Schedule your tasks and compromises',
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
