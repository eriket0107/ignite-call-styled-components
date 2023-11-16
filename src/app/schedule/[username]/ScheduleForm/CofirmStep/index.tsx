import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CalendarBlank, Clock } from 'phosphor-react'

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Text, TextArea } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>
interface ConfirmationStepsProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

const ConfirmStep = ({
  onCancelConfirmation,
  schedulingDate,
}: ConfirmationStepsProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })
  const { username } = useParams()
  console.log(username)

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  const handleConfirmScheduling = async (data: ConfirmFormData) => {
    const { name, email, observations } = data
    try {
      await api.post(`/users/${username}/scheduling`, {
        name,
        email,
        observations,
        date: schedulingDate,
      })
      onCancelConfirmation()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ConfirmForm as={'form'} onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
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
