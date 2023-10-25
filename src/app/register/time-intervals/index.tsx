'use client'

import { Checkbox, Text } from '@ignite-ui/react'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { MultiStep } from '@/components/MultiStep'

import { Container, Header, Heading, Text as TextStyled } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'

import { ArrowRight } from 'phosphor-react'

const TimeIntervals = () => {
  return (
    <Container>
      <Header>
        <Heading as="strong" size={'2xl'}>
          Quase lá
        </Heading>
        <TextStyled>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </TextStyled>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as={'form'}>
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput.Container size="sm">
                <TextInput.Input step={60} type="time" />
              </TextInput.Container>
              <TextInput.Container size="sm">
                <TextInput.Input step={60} type="time" />
              </TextInput.Container>
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput.Container size="sm">
                <TextInput.Input step={60} type="time" />
              </TextInput.Container>
              <TextInput.Container size="sm">
                <TextInput.Input step={60} type="time" />
              </TextInput.Container>
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button type="submit" size="md">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}

export default TimeIntervals
