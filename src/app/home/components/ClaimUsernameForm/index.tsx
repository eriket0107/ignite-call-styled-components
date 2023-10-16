'use client'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormAnnotation, Text } from './styles'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'

import { ArrowRight } from 'phosphor-react'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens',
    }),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

const ClaimUsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })
  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data)
  }

  return (
    <>
      <Form as={'form'} onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput.Container>
          <TextInput.Prefix>ignite.com/</TextInput.Prefix>
          <TextInput.Input
            placeholder="seu-usuário"
            {...register('username')}
          />
        </TextInput.Container>
        <Button size="md" variant={'primary'} type={'submit'}>
          Reservar usuário
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username?.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}

export default ClaimUsernameForm
