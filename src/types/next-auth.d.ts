import NextAuth, { Account, DefaultSession, User } from 'next-auth'
import JWT from 'next-auth/jwt'
import { EUserType } from './enums'

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    accessToken?: Account.accessToken,
    user: {
      id: number,
      username: string,
      email: string,
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
    accessToken?: Account.accessToken,
    id: number,
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
