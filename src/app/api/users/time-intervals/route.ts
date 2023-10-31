import { getServerSession } from 'next-auth'

import { AuthOptions } from '@/lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface timeIntervalsBodySchema {
  intervals: {
    weekDay: number
    startTimeInMinutes: number
    endTimeInMinutes: number
  }[]
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(AuthOptions)

  if (!session)
    return NextResponse.json(
      { message: 'É necessário ter uma sessão para prosseguir.' },
      { status: 401 },
    )

  const { intervals }: timeIntervalsBodySchema = await req.json()

  await Promise.all(
    intervals.map((interval) =>
      prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session?.user?.id,
        },
      }),
    ),
  )

  return NextResponse.json({ message: 'OK' }, { status: 201 })
}
