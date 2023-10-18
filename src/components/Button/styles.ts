import styled, { css } from 'styled-components'
import { CircleNotch } from 'phosphor-react'

export interface ButtonPropsStyles {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md'
}

export const ButtonVariant = styled.button<ButtonPropsStyles>`
  all: unset;
  border-radius: ${(props) => props.theme['border-radius'].sm};
  font-size: ${(props) => props.theme['font-size'].sm};
  text-align: center;
  min-width: 120px;
  box-sizing: border-box;
  padding: 0 ${(props) => props.theme.spacing[4]};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[2]};

  cursor: pointer;

  svg {
    width: ${(props) => props.theme.spacing[4]};
    height: ${(props) => props.theme.spacing[4]};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.gray100};
  }

  ${(props) =>
    props.variant === 'primary' &&
    css`
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.ignite500};

      &:not(:disabled):hover {
        background: ${props.theme.colors.ignite300};
      }

      &:disabled {
        background-color: ${props.theme.colors.gray200};
        cursor: not-allowed;
      }
    `}

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      color: ${props.theme.colors.ignite300};
      border: 2px solid ${props.theme.colors.ignite500};

      &:not(:disabled):hover {
        background: ${props.theme.colors.ignite500};
        color: ${props.theme.colors.white};
      }

      &:disabled {
        color: ${props.theme.colors.gray200};
        border-color: ${props.theme.colors.gray200};
      }
    `}


${(props) =>
    props.variant === 'tertiary' &&
    css`
      color: ${props.theme.colors.gray100};

      &:not(:disabled):hover {
        color: ${props.theme.colors.white};
      }

      &:disabled {
        color: ${props.theme.colors.gray600};
      }
    `}
`

export const Loading = styled(CircleNotch)`
  animation: rotate 1000ms linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`
