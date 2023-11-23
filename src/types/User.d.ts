import { ApiResponseWithReturn } from './ApiResponse'
import { EUserState, EUserType } from './enums'

export interface User {
  id: number,
  username: string,
  password: string,
  type: EUserType,
  state: EUserState,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null,
  createdAt: string,
  updatedAt: string
}

export interface UserDB {
  userId: number,
  username: string,
  password: string,
  type: EUserType,
  state: EUserState,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null,
  createdAt: string,
  updatedAt: string
}

export type UserResponse = ApiResponseWithReturn<UserDB>

export type UserCredentials = {
  username: string,
  password: string
}
