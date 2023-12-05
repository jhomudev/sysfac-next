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

export interface UserFromDB {
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

export interface UserToDB {
  username: string,
  password: string,
  type: EUserType,
  state: EUserState,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null,
}

export type UserResponse = ApiResponseWithReturn<UserFromDB>

export type UserCredentials = {
  username: string,
  password: string
}
