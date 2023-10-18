import styled from 'styled-components'
import {
  Box,
  Heading as HeadingStyled,
  Text as TextStyled,
} from '@ignite-ui/react'
import theme from '../styles/theme'
import { Button as ButtonStyled } from '@/components/Button'

export const Container = styled.main`
  max-width: 572px;
  margin: ${(props) => props.theme.spacing[20]} auto
    ${(props) => props.theme.spacing[4]};

  padding: 0 ${(props) => props.theme.spacing[4]};
`

interface HeadingProps {
  size: keyof (typeof theme)['font-size']
}

export const Heading = styled(HeadingStyled)<HeadingProps>`
  && {
    line-height: ${(props) => props.theme['line-height'].base};
    font-size: ${(props) => props.theme['font-size'][props.size]};
  }
`

export const Text = styled(TextStyled)`
  && {
    line-height: ${(props) => props.theme['line-height'].base};
    color: ${(props) => props.theme.colors.gray200};
    margin-bottom: ${(props) => props.theme.spacing[6]};
  }
`

export const Header = styled.header`
  padding: 0 ${(props) => props.theme.spacing[6]};
`

export const Button = styled(ButtonStyled)`
  padding: ${(props) => props.theme.spacing[3]};
`

export const Form = styled(Box)`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.colors.gray800};
  border-radius: ${(props) => props.theme['border-radius'].sm};
  gap: ${(props) => props.theme.spacing[4]};
  margin-top: ${(props) => props.theme.spacing[6]};
  padding: ${(props) => props.theme.spacing[6]};

  > label {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[2]};
  }
`

export const FormError = styled(TextStyled)`
  && {
    color: ${(props) => props.theme.colors.igniteError};
  }
`
