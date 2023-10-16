import styled from 'styled-components'
import { Box, Text as TextSyled } from '@ignite-ui/react'

export const Form = styled(Box)`
  display: grid;

  background-color: ${(props) => props.theme.colors.gray800};
  border-radius: ${(props) => props.theme['border-radius'].sm};
  grid-template-columns: 1fr auto;
  gap: ${(props) => props.theme.spacing[2]};
  margin-top: ${(props) => props.theme.spacing[4]};
  padding: ${(props) => props.theme.spacing[4]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
export const Text = styled(TextSyled)`
  && {
    color: ${(props) => props.theme.colors.gray400};
  }
`

export const FormAnnotation = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]};
`
