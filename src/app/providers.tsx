import { ReactNode } from 'react'
import { ProviderTheme } from './styles/provider'

export const Provider = ({ children }: { children: ReactNode }) => (
  <ProviderTheme>{children}</ProviderTheme>
)
