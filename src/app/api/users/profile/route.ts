import { getServerSession } from 'next-auth'

import { AUTH_OPTIONS } from '@/lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface updateProfileBodySchema {
  bio: string
}

export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(AUTH_OPTIONS)

  if (!session)
    return NextResponse.json(
      { message: 'É necessário ter uma sessão para prosseguir.' },
      { status: 401 },
    )

  const { bio }: updateProfileBodySchema = await req.json()

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({ message: 'OK' }, { status: 200 })
}
