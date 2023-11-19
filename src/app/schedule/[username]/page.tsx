import { prisma } from '@/lib/prisma'
import Schedule from '.'
import { Metadata } from 'next'

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

export const generateMetadata = async ({
  params,
}: {
  params: { username: string }
}): Promise<Metadata> => {
  const user = await getUser(params)

  return {
    title: `Agende com ${user.name}`,
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
