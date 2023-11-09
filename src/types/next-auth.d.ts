import NextAuth, { Account, DefaultSession, User } from 'next-auth'
import { EUserType } from './enumDB'
import JWT from 'next-auth/jwt'

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    accessToken?: Account.accessToken,
    user: {
      email: string,
      username: string,
      type: EUserType,
      names: string,
      lastnames: string,
      iat: number,
      exp: number,
      jti: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: Account.accessToken
  }
}
