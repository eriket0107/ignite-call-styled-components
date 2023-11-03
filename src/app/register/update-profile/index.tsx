'use client'
import { z } from 'zod'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { Session } from 'next-auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/lib/axios'

import { Text as Label, TextArea } from '@ignite-ui/react'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { MultiStep } from '@/components/MultiStep'

import { ArrowRight } from 'phosphor-react'

import { Container, Header, Heading, Text } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileSchema = z.object({
  bio: z
    .string()
    .min(3, { message: 'A bio precisa ter pelo menos 20 caracteres.' }),
})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

const UpdateProfile = ({ session }: { session: Session }) => {
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
      await api.put('/users/profile', {
        bio: data.bio,
      })

      setIsSubmitSuccessful(true)
      router.push(`/schedule/${session.user.username} `)
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

        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de Perfil</Text>
          <Avatar src={session.user.avatar_url} alt={session?.user?.name} />
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
