import { prisma } from '@/lib/prisma'
import Schedule from '.'

export const generateStaticParams = async () => {
  return []
}

const getUser = async ({ username }: { username: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    name: user.name as string,
    bio: user.bio as string,
    avatarUrl: user.avatar_url as string,
  }
}

export const SchedulePage = async ({
  params,
}: {
  params: { username: string }
}) => {
  const user = await getUser(params)
  return <Schedule user={user} />
}

export default SchedulePage
