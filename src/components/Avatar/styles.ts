import * as Avatar from '@radix-ui/react-avatar'
import styled from 'styled-components'

export const AvatarContainer = styled(Avatar.Root)`
  border-radius: ${(props) => props.theme.borderRadius.full};

  display: inline-block;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
`

export const AvatarImage = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

export const AvatarFallback = styled(Avatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray600};
  color: ${(props) => props.theme.colors.gray800};

  svg: {
    width: 1.5rem;
    height: 1.5rem;
  }
`
