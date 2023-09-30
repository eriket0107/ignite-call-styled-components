import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    height: 100vh;
  }

  body {
    background-color: ${(props) => props.theme.colors.gray900};
    color: ${(props) => props.theme.colors.gray100};
    -webkit-font-smoothing: antialiased;
  }
`
