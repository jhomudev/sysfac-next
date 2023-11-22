import NextAuth, { Account, DefaultSession, User } from 'next-auth'
import { EUserType } from './enumDB'
import JWT from 'next-auth/jwt'
import { TCartPurchaseItem } from '@/context/store/slices/cartPurchaseSlice'
import { TCartItem } from '@/context/store/slices/cartSlice'

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
      cart:TCartItem[],
      cartPurchase:TCartPurchaseItem[],
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
