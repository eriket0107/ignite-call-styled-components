import { Box } from '@ignite-ui/react'
import styled from 'styled-components'

export const IntervalBox = styled(Box)`
  margin-top: ${(props) => props.theme.spacing[6]};
  padding: ${(props) => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.gray800};
  border-radius: ${(props) => props.theme.borderRadius.md};
`

export const IntervalsContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray600};
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`
export const IntervalItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.spacing[3]} ${props.theme.spacing[4]}`};

  & + & {
    border-top: 1px solid ${(props) => props.theme.colors.gray600};
  }
`

export const IntervalDay = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
`

export const IntervalInputs = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};

  input::-webkit-calendar-picker-indicator {
    filter: invert(100%) brightness(30%) saturate(0%);
  }
`
