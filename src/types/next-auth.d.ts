import NextAuth, { Account, DefaultSession, User } from 'next-auth'
import JWT from 'next-auth/jwt'
import { EUserType } from './enums'

declare module 'next-auth' {
  interface Session {
    accessToken?: Account.accessToken,
    user: {
      id: number,
      username: string,
      email: string,
      type: EUserType,
      names: string,
      lastnames: string
      // iat: number,
      // exp: number,
      // jti: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: Account.accessToken
  }
}
