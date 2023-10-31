'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

import { Text as Label, TextArea } from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'
import { Container, Header, Heading, Text } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'
import { Session } from 'next-auth'

const updateProfileSchema = z.object({
  bio: z
    .string()
    .min(3, { message: 'A bio precisa ter pelo menos 20 caracteres.' }),
})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

interface UpdateProfileProps {
  session: Session | null
}

const UpdateProfile = ({ session }: UpdateProfileProps) => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const handleUpdateProfile = async (data: UpdateProfileFormData) => {
    try {
      await api.post('/users', {
        bio: data.bio,
      })

      setIsSubmitSuccessful(true)
      router.push('/updateProfile/connect-calendar')
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

  console.log(session)

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

        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de Perfil</Text>
        </label>

        <label>
          <Label size="sm">Sobre você</Label>
          <TextArea {...register('bio')} />
        </label>
        <FormAnnotation size="sm">
          Fale um pouco sobre você. Isto será exibido em sua página pessoal.
        </FormAnnotation>
        <Button
          type={'submit'}
          disabled={isSubmitting}
          isLoading={isSubmitting}
          isSubmitted={isSubmitSuccessful}
        >
          Finalizar <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export default UpdateProfile
