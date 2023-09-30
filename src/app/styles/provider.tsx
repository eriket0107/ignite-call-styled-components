'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './global'
import theme from './theme'
import StyledComponentsRegistry from './registry'

export const ProviderTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    </ThemeProvider>
  )
}
