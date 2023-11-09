import axios from 'axios'
import NextAuth, { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'jhonan' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        const res = await axios.post(`${process.env.API_URL}/auth/login`, credentials)
        const auth = await res.data

        // If no error and we have user data, return it
        if (auth.ok) return auth.data
        // Return null if user data could not be retrieved
        // throw auth
        return null
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }: {token: JWT, user: User}) {
      return { ...token, ...user }
    },
    async session ({ session, token }: {session: Session, token: JWT}) {
      session.user = token
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
