'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

import { Text as Label } from '@ignite-ui/react'

import { MultiStep } from '@/components/MultiStep'
import { TextInput } from '@/components/TextInput'

import { ArrowRight } from 'phosphor-react'

import {
  Container,
  Header,
  Text,
  Heading,
  Form,
  Button,
  FormError,
} from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const Register = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('username')
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    if (search) setValue('username', search)
  }, [search, setValue])

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
      setIsSubmitSuccessful(true)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err?.response?.data?.message)
        setError('root.serverError', {
          message: `${err?.response?.data?.message}`,
        })
        setIsSubmitSuccessful(false)
        return
      }
      console.error(err)
    }
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

        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Label size="sm">Nome de usuário</Label>
          <TextInput.Container>
            <TextInput.Prefix>ignite.com/</TextInput.Prefix>
            <TextInput.Input
              placeholder="seu usuário"
              {...register('username')}
            />
          </TextInput.Container>

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Label size="sm">Nome Completo</Label>
          <TextInput.Container>
            <TextInput.Input placeholder="seu usuário" {...register('name')} />
          </TextInput.Container>

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button
          type={'submit'}
          disabled={isSubmitting}
          isLoading={isSubmitting}
          isSubmitted={isSubmitSuccessful}
        >
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}

export default Register
