import { NextAuthOptions } from 'next-auth'
import Google, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '../../lib/auth/prisma-adapter'

export const AUTH_OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ account }) => {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar?error=permissions'
      }

      return true
    },
    session: async ({ session, user }) => {
      return {
        ...session,
        user,
      }
    },
  },
}
