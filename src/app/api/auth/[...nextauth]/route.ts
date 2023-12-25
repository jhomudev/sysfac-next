import { validateUserCredentials } from '@/interceptors'
import { UserCredentials } from '@/types'
import NextAuth, { AuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'jhonan' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        const auth = await validateUserCredentials(credentials as UserCredentials)

        // If no error and we have user data, return it
        if (auth!.access && auth!.isActive) return auth!.data as any
        // Return null if user data could not be retrieved
        // throw auth
        return null
      }
    })
  ],
  callbacks: {
    async jwt ({ token }:{ token: JWT }) {
      return token
    },
    async session ({ session, token }: { session: Session, token: JWT }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
