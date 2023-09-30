'use client'
import { Container, Heading, Hero, Preview, Text } from './styles'

import Image from 'next/image'

import calendar from '@/assets/app-preview.png'

const Home = () => {
  return (
    <Container>
      <Hero>
        <Heading size="4xl" className={'teste'}>
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>
      <Preview>
        <Image
          src={calendar}
          height={400}
          quality={100}
          priority
          alt={'Imagem de calendário simbolizando aplicação'}
        />
      </Preview>
    </Container>
  )
}

export default Home
