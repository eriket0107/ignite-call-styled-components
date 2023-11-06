import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CalendarBlank, Clock } from 'phosphor-react'

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Text, TextArea } from '@ignite-ui/react'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

const ConfirmStep = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const handleConfirmScheduling = (data: ConfirmFormData) => {
    console.log(data)
  }

  return (
    <ConfirmForm as={'form'} onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de setembro 2023
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput.Container>
          <TextInput.Input placeholder="Seu nome" {...register('name')} />
        </TextInput.Container>
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput.Container>
          <TextInput.Input
            placeholder="johndoe@email.com"
            {...register('email')}
          />
        </TextInput.Container>
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}

export default ConfirmStep
