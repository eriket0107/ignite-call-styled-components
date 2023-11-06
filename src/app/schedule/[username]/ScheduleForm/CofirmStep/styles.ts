import { Box, Text } from '@ignite-ui/react'
import styled from 'styled-components'

export const ConfirmForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
  margin: ${(props) => props.theme.spacing[6]} auto 0;
  background-color: ${(props) => props.theme.colors.gray800};
  padding: ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  max-width: 540px;

  label {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[2]};
  }
`

export const FormHeader = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[4]};
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing[6]};
  margin-bottom: ${(props) => props.theme.spacing[2]};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray600};

  p {
    display: flex;
    gap: ${(props) => props.theme.spacing[2]};
    align-items: center;

    svg {
      color: ${(props) => props.theme.colors.gray200};
      height: 1.25rem;
      width: 1.25rem;
    }
  }
`

export const FormError = styled(Text)`
  && {
    color: ${(props) => props.theme.colors.igniteError};
  }
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing[2]};
  margin-top: ${(props) => props.theme.spacing[2]};
`
