import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import { Provider } from './providers'

export type LayoutProps = {
  children: ReactNode
  types: ReactNode
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }: LayoutProps) {
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
