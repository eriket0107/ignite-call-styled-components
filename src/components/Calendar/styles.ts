import { Text } from '@ignite-ui/react'
import styled from 'styled-components'

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
  padding: ${(props) => props.theme.spacing[6]};
`

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CalendarTitle = styled(Text)`
  && {
    font-weight: 500;
    text-transform: capitalize;

    > span {
      color: ${(props) => props.theme.colors.gray200};
    }
  }
`

export const CalendarActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[2]};
  color: ${(props) => props.theme.colors.gray200};

  > button {
    all: unset;
    cursor: pointer;
    line-height: 0;
    border-radius: ${(props) => props.theme.borderRadius.sm};

    svg {
      width: ${(props) => props.theme.spacing[5]};
      height: ${(props) => props.theme.spacing[5]};
    }

    &:hover {
      color: ${(props) => props.theme.colors.gray100};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${(props) => props.theme.colors.gray100};
    }
  }
`

export const CalendarBody = styled.table`
  width: 100%;
  font-family: Roboto, sans-serif;
  border-spacing: 0.25rem;
  table-layout: fixed;

  > thead th {
    color: ${(props) => props.theme.colors.gray200};
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSize.sm};
  }

  > tbody::before {
    content: '.';
    line-height: 0.75rem;
    display: block;
    color: ${(props) => props.theme.colors.gray800};
  }

  > tbody td {
    box-sizing: border-box;
  }
`

export const CalendarDay = styled.button`
  all: unset;
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.theme.colors.gray600};
  text-align: center;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.sm};

  &:disabled {
    background: none;
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.gray500};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.gray100};
  }
`
