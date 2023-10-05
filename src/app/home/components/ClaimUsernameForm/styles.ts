import styled from 'styled-components'
import { Box } from '@ignite-ui/react'

export const Form = styled(Box)`
  display: grid;

  background-color: ${(props) => props.theme.colors.gray800};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  grid-template-columns: 1fr auto;
  gap: ${(props) => props.theme.spacing[2]};
  margin-top: ${(props) => props.theme.spacing[4]};
  padding: ${(props) => props.theme.spacing[4]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
