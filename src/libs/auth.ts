import { validateUserCredentials } from '@/interceptors'
import { UserCredentials } from '@/types'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'

export const {
  handlers:
  { GET, POST },
  auth, signIn, signOut
} = NextAuth({
  ...authConfig,
  providers: [CredentialsProvider({
    async authorize (credentials) {
      const auth = await validateUserCredentials(credentials as UserCredentials)
      // If no error and we have user data, return it
      if (auth!.access && auth!.isActive) return auth!.data as any
      // Return null if user data could not be retrieved
      // throw auth
      return null
    }
  })],
  callbacks: {
    ...authConfig.callbacks
  }
})
