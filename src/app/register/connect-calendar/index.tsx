'use client'
import { signIn, useSession } from 'next-auth/react'

import { MultiStep } from '@/components/MultiStep'

import { Container, Header, Text, Heading, Button } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

import { ArrowRight, Check, GoogleLogo } from 'phosphor-react'
import { ReactElement } from 'react'

const Calendar = () => {
  const { status, data } = useSession()
  console.log(status, data)
  const isAuthenticated = status === 'authenticated'

  const handleSignIn = async () => {
    await signIn('google')
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

        <Button type={'submit'} disabled={!isAuthenticated}>
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default Calendar
