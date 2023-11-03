import { Heading as HeadingStyled, Text as TextStyled } from '@ignite-ui/react'
import styled from 'styled-components'

export const Container = styled.div`
  max-width: 852px;
  padding: ${(props) => `0 ${props.theme.spacing[4]}`};
  margin: ${(props) =>
    `${props.theme.spacing[20]} auto ${props.theme.spacing[4]}`};
`

export const Heading = styled(HeadingStyled)`
  && {
    line-height: ${(props) => props.theme.lineHeight.base};
    margin-top: ${(props) => props.theme.spacing[2]};
  }
`

export const Text = styled(TextStyled)`
  && {
    color: ${(props) => props.theme.colors.gray200};
  }
`

export const UserHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
