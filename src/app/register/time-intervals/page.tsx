import { getServerSession } from 'next-auth'
import TimeIntervals from '.'
import { AuthOptions } from '@/lib/auth/auth'

async function getData() {
  const session = await getServerSession(AuthOptions)

  return {
    session,
    user: session?.user,
    expires: session?.expires as string,
  }
}

export default async function Page() {
  const session = await getData()

  return <TimeIntervals session={session} />
}
