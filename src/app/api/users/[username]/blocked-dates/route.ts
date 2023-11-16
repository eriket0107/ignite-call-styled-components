import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: { username: string } },
) => {
  const { username } = params
  const year = req.nextUrl.searchParams.get('year')
  const month = req.nextUrl.searchParams.get('month')

  if (!year || !month)
    return NextResponse.json(
      { message: 'Year or month not specified.' },
      { status: 400 },
    )

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 400 },
    )

  const avaibleWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !avaibleWeekDays.some(
      (avaibleWeekDay) => avaibleWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
  SELECT
    EXTRACT(DAY FROM S.DATE) AS date,
    COUNT(S.date) AS amount,
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

  FROM schedulings S

  LEFT JOIN user_time_intervals UTI
    ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

  WHERE S.user_id = ${user.id}
    AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

  GROUP BY EXTRACT(DAY FROM S.DATE),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  HAVING amount >= size
`
  const blockedDates = blockedDatesRaw.map((item) => item.date)
  return NextResponse.json({ blockedWeekDays, blockedDates })
}
