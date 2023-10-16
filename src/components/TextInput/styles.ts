import styled, { css } from 'styled-components'

interface TextInputContainerVariants {
  size?: 'md' | 'sm'
}

export const InputContainer = styled.div<TextInputContainerVariants>`
  background-color: ${(props) => props.theme.colors.gray900};
  border-radius: ${(props) => props.theme['border-radius'].sm};
  box-sizing: border-box;
  border: 2px solid ${(props) => props.theme.colors.gray900};
  display: flex;
  align-items: center;

  ${(props) =>
    props.size === 'sm' &&
    css`
      padding: ${props.theme.spacing['2']} ${props.theme.spacing['3']};
    `}

  ${(props) =>
    props.size === 'md' &&
    css`
      padding: ${props.theme.spacing['3']} ${props.theme.spacing['4']};
    `}

  &:has(input:focus) {
    border-color: ${(props) => props.theme.colors.ignite300};
  }

  &:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const PrefixContainer = styled.span`
  font-size: ${(props) => props.theme['font-size'].sm};
  color: ${(props) => props.theme.colors.gray200};
  font-weight: regular;
`

export const InputContent = styled.input`
  color: ${(props) => props.theme.colors.white};
  font-weight: regular;
  background: transparent;
  border: 0;
  width: 100%;

  &:focus {
    outline: 0;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
  }
`
