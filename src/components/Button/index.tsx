import { ButtonHTMLAttributes } from 'react'
import { ButtonVariant, Loading } from './styles'
import { Check } from 'phosphor-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md'
  isLoading?: boolean
  isSubmitted?: boolean
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  isSubmitted = false,
  ...rest
}: ButtonProps) => {
  const RenderButtonContent = () => {
    if (isLoading) {
      return <Loading />
    } else if (isSubmitted) {
      return <Check />
    } else {
      return children
    }
  }

  return (
    <ButtonVariant variant={variant} size={size} {...rest}>
      <RenderButtonContent />
    </ButtonVariant>
  )
}
