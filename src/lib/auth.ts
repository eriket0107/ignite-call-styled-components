import { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'

const scope =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },
  },
}
