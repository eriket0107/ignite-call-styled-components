'use client'
import { ReactNode, ForwardedRef, forwardRef, ComponentProps } from 'react'
import { PrefixContainer, InputContainer, InputContent } from './styles'

interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'md'
}

const Container = ({ children, size = 'sm' }: ContainerProps) => (
  <InputContainer size={size}>{children}</InputContainer>
)

const Prefix = ({ children }: { children: ReactNode }) => (
  <PrefixContainer>{children}</PrefixContainer>
)

interface InputProps extends ComponentProps<'input'> {
  classname?: string
}

const Input = forwardRef(
  ({ ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputContent ref={ref} {...props} />
  },
)
Input.displayName = 'Input'

export const TextInput = {
  Container,
  Prefix,
  Input,
}
