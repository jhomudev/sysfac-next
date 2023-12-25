import 'next-auth/jwt'
import { EUserType } from './enums'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: number,
    username: string,
    email: string,
    type: EUserType,
    names: string,
    lastnames: string
  }
  interface Session extends DefaultSession {
    user: User;
    expires: string;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number,
    username: string,
    email: string,
    type: EUserType,
    names: string,
    lastnames: string
  }
}
