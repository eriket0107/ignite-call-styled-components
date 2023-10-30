import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  if (!body) {
    return NextResponse.json({ message: 'Body empty' }, { status: 500 })
  }

  const { username, name } = body
  const { set: SetCookie } = cookies()

  const usernameExists = await prisma.user.findUnique({ where: { username } })

  if (usernameExists) {
    return NextResponse.json(
      { message: 'Username already exists.' },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      username,
      name,
    },
  })

  SetCookie({
    name: '@IgniteCall:userId',
    value: user.id,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return NextResponse.json({ user }, { status: 201 })
}
