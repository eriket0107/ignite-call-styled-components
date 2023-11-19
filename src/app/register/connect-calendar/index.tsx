'use client'
import { ReactElement } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { signIn, useSession } from 'next-auth/react'

import { MultiStep } from '@/components/MultiStep'

import { Container, Header, Text, Heading, Button, FormError } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

import { ArrowRight, Check, GoogleLogo } from 'phosphor-react'
const Calendar = () => {
  const router = useRouter()
  const session = useSession()
  const searchParams = useSearchParams()
  const isAuthenticated = session.status === 'authenticated'
  const hasAuthError = searchParams.get('error') === 'permissions'

  const handleSignIn = async () => {
    await signIn('google')
  }

  const handleNaviteNextStep = async () => {
    await router.push('/register/time-intervals')
  }

  const GetAuthenticadeStatus = (): ReactElement => {
    if (isAuthenticated)
      return (
        <>
          <Check />
          Conectado
        </>
      )
    return (
      <>
        <GoogleLogo />
        Conectar
      </>
    )
  }

  return (
    <Container>
      <Header>
        <Heading as="strong" size={'2xl'}>
          Bem-vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar </Text>
          <Button
            type={'submit'}
            variant={isAuthenticated ? 'connected' : 'secondary'}
            disabled={isAuthenticated}
            size="sm"
            onClick={handleSignIn}
          >
            <GetAuthenticadeStatus />
          </Button>
        </ConnectItem>
        {hasAuthError && (
          <FormError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </FormError>
        )}
        <Button
          onClick={handleNaviteNextStep}
          type={'submit'}
          disabled={!isAuthenticated}
        >
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default Calendar
