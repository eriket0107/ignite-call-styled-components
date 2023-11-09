import { Box, Text } from '@ignite-ui/react'
import styled, { css } from 'styled-components'

interface ContainterProps {
  isTimePickerOpen: boolean
}

export const Containter = styled(Box)<ContainterProps>`
  margin: ${(props) => `${props.theme.spacing[6]} auto 0`};
  padding: 0;
  display: grid;
  max-width: 100%;
  position: relative;

  ${({ isTimePickerOpen }) =>
    isTimePickerOpen &&
    css`
      && {
        grid-template-columns: 1fr 280px;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
        }
      }
    `}

  ${({ isTimePickerOpen }) =>
    !isTimePickerOpen &&
    css`
      && {
        width: 540px;
        grid-template-columns: 1fr;
      }
    `}
`

export const TimePicker = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.gray600};
  padding: ${(props) =>
    `${props.theme.spacing[6]} ${props.theme.spacing[6]} 0`};
  overflow-y: scroll;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 280px;
`

export const TimePickerHeader = styled(Text)`
  && {
    font-weight: 500;
    text-transform: capitalize;
    > span {
      color: ${(props) => props.theme.colors.gray200};
    }
  }
`

export const TimePickerList = styled.div`
  margin-top: ${(props) => props.theme.spacing[3]};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing[2]};

  @media (max-width: 900px) {
    grid-template-columns: 2fr;
  }
`

export const TimePickerItem = styled.button`
  border: 0;
  background-color: ${(props) => props.theme.colors.gray600};
  padding: ${(props) => `${props.theme.spacing[2]}  0`};
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray100};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: ${(props) => props.theme.lineHeight.base};

  &:last-child {
    margin-bottom: ${(props) => props.theme.spacing[6]};
    cursor: pointer;
  }

  &:disabled {
    background: none;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.gray500};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.gray100};
  }
`
