import { NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export const POST = async (
  req: NextRequest,
  { params }: { params: { username: string } },
) => {
  const { username } = params

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 400 },
    )

  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime(),
  })

  const { name, email, observations, date } = createSchedulingBody.parse(
    await req.json(),
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date()))
    return NextResponse.json(
      { message: 'Date is in the past' },
      { status: 400 },
    )

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling)
    return NextResponse.json(
      { message: 'There is anothor scheduling in the same time' },
      { status: 400 },
    )

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return NextResponse.json({ message: 'OK' }, { status: 201 })
}
