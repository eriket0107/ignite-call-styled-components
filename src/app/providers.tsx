'use client'
import '../lib/dayjs'

import { ReactNode } from 'react'
import { ProviderTheme } from './styles/provider'
import { SessionProvider } from 'next-auth/react'

export const Provider = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <ProviderTheme>{children}</ProviderTheme>
  </SessionProvider>
)
