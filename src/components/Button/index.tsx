import { ButtonHTMLAttributes } from 'react'
import { ButtonVariant } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'tertiary'
  size: 'sm' | 'md'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonVariant variant={variant} size={size} {...rest}>
      {children}
    </ButtonVariant>
  )
}

Button.displayName = 'Button'
