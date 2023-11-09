// export { default } from './index'

import { AUTH_OPTIONS } from '@/lib/auth/auth'
import { User, getServerSession } from 'next-auth'
import UpdateProfile from '.'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

const getSessionData = async () => {
  const getSessionToken = cookies().get('next-auth.session-token')?.value
  const sessionUser = await getServerSession(AUTH_OPTIONS)
  const sessionExpires = await prisma.session.findUnique({
    where: { session_token: getSessionToken },
  })

  return {
    user: sessionUser?.user as User,
    expires: String(sessionExpires?.expires),
  }
}

const UpdateProfilePage = async () => {
  const session = await getSessionData()
  return <UpdateProfile session={session} />
}

export default UpdateProfilePage
