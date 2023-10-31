import { Box, Text } from '@ignite-ui/react'
import styled from 'styled-components'

export const ProfileBox = styled(Box)`
  background-color: ${(props) => props.theme.colors.gray800};
  padding: ${(props) => props.theme.spacing[6]};
  margin-top: ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.borderRadius.sm};

  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};

  label {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[2]};
  }
`

export const FormAnnotation = styled(Text)`
  color: ${(props) => props.theme.colors.gray200};
`
