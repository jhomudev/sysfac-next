import { ApiResponseWithReturn } from './ApiResponse'
import { EUserState, EUserType } from './enums'

export type User = {
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

export type UserFromDB = {
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

export type UserToDB = {
  username: string,
  password: string,
  type: EUserType,
  state: EUserState,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null,
}

export type UserCredentials = {
  username: string,
  password: string
}
