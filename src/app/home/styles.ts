import styled from 'styled-components'
import { Heading as HeadingStyled, Text as TextSyled } from '@ignite-ui/react'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['20']};
  margin-left: auto;
  max-width: calc(100vw - (100vw - 1160px) / 2);
  height: 100vh;
  overflow: hidden;
`
export const Heading = styled(HeadingStyled)`
  && {
    font-size: ${(props) => props.theme['font-size']['7xl']};
    @media (max-width: 600px) {
      font-size: ${({ theme }) => theme['font-size']['6xl']};
    }
  }
`
export const Text = styled(TextSyled)`
  && {
    margin-top: ${({ theme }) => theme.spacing['2']};
    color: ${({ theme }) => theme.colors.gray200};
  }
`

export const Hero = styled.div`
  max-width: 480px;
  padding: 0 ${(props) => props.theme.spacing['10']};
`

export const Preview = styled.div`
  padding-right: ${({ theme }) => theme.spacing['8']};
  overflow: hidden;
  @media (max-width: 600px) {
    display: none;
  }
`
