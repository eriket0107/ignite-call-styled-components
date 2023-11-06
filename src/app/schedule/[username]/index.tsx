'use client'
import { Avatar } from '@/components/Avatar'
import { Container, Heading, Text, UserHeader } from './styles'
import { ScheduleForm } from './ScheduleForm'

interface ScheduleProps {
  user: {
    name?: string
    bio?: string
    avatarUrl?: string
  }
}

const Schedule = ({ user }: ScheduleProps) => {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user?.avatarUrl} />
        <Heading>{user?.name}</Heading>
        <Text>{user?.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}

export default Schedule
