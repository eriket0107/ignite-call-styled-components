import styled from 'styled-components'
import { Box, Text as TextStyled } from '@ignite-ui/react'
import { Text } from '../styles'

export const ConnectBox = styled(Box)`
  margin-top: ${(props) => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
`

export const ConnectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${(props) => props.theme.colors.gray600};
  padding: ${(props) => `${props.theme.spacing[4]} ${props.theme.spacing[6]}`};

  border-radius: ${(props) => props.theme.borderRadius.md};

  margin-bottom: ${(props) => props.theme.spacing[4]};

  > ${Text} {
    margin-bottom: 0;
  }
`

export const AuthError = styled(TextStyled)`
  color: ${(props) => props.theme.colors.igniteError};
`
