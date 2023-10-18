import { Text } from '@ignite-ui/react'
import styled from 'styled-components'
export const MultiStepContainer = styled.div``

export const Label = styled(Text)`
  color: ${(props) => props.theme.colors.gray200};
`

interface StepsProps {
  size: number
}

export const Steps = styled.div<StepsProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  gap: ${(props) => props.theme.spacing[2]};
  margin-top: ${(props) => props.theme.spacing[1]};
`
interface StepProps {
  active: 'true' | 'false'
}

export const Step = styled.div<StepProps>`
  height: ${(props) => props.theme.spacing[1]};
  border-radius: ${(props) => props.theme['border-radius'].px};
  background-color: ${(props) => props.theme.colors.gray600};

  ${(props) =>
    props.active === 'true' &&
    `
    background-color: ${props.theme.colors.gray100};
  `}
`
