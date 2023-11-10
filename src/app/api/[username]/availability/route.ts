/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'

import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'

export const GET = async (
  req: NextRequest,
  route: { params: { username: string } },
) => {
  const username = route.params.username

  const date = req.nextUrl.searchParams.get('date')

  if (!date)
    return NextResponse.json({ message: 'Date no provided.' }, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 400 },
    )

  const referenceDate = dayjs(date)
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate)
    return NextResponse.json({ possibleTimes: [], availability: [] })

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability)
    return NextResponse.json({ possibleTimes: [], availability: [] })

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const blockedTimes = await prisma.schelduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: dayjs(referenceDate).set('hour', startHour).toDate(),
        lte: dayjs(referenceDate).set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter(
    (time) =>
      !blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time),
  )

  return NextResponse.json({ possibleTimes, availableTimes })
}
