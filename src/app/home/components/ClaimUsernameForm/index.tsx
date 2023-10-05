import { Button } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { TextInput } from '@/components/TextInput'

const ClaimUsernameForm = () => {
  return (
    <Form as={'form'}>
      <TextInput.Container>
        <TextInput.Prefix>ignite.com/</TextInput.Prefix>
        <TextInput.Input placeholder="seu-usuário" />
      </TextInput.Container>
      <Button size={'sm'} type={'submit'}>
        Reservar usuário
        <ArrowRight />
      </Button>
    </Form>
  )
}

export default ClaimUsernameForm
