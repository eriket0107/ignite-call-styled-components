'use client'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { Checkbox, Text } from '@ignite-ui/react'

import { getWeekDays } from '@/utils/get-week-days'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { MultiStep } from '@/components/MultiStep'
import { Container, Header, Heading, Text as TextStyled } from '../styles'
import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'

import { ArrowRight } from 'phosphor-react'
import { convertHourToMinutes } from '@/utils/convert-hour-to-minutes'
import { api } from '@/lib/axios'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) =>
      intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertHourToMinutes(interval.startTime),
          endTimeInMinutes: convertHourToMinutes(interval.endTime),
        }
      }),
    )
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message: 'Horário de término deve ter 1 hora de diferença do início',
      },
    ),
})

type TimeInvtervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeInvtervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

const TimeIntervals = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<TimeInvtervalsFormInput, any, TimeInvtervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDays()
  const intervals = watch('intervals')

  const handleSetTimeIntervals = async (data: TimeInvtervalsFormOutput) => {
    const { intervals } = data
    await api.post('/users/time-intervals', { intervals })
    await router.push('/register/update-profile')
  }

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

      <IntervalBox
        as={'form'}
        onSubmit={handleSubmit(handleSetTimeIntervals)}
        control={control}
      >
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked === true)
                      }}
                      checked={field.value}
                    />
                  )}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput.Container size="sm">
                  <TextInput.Input
                    step={60}
                    type="time"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                </TextInput.Container>
                <TextInput.Container size="sm">
                  <TextInput.Input
                    step={60}
                    type="time"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </TextInput.Container>
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals?.root?.message && (
          <FormError size="sm">{errors.intervals?.root?.message}</FormError>
        )}

        <Button type="submit" size="md" isLoading={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}

export default TimeIntervals
