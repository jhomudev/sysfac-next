import { ApiResponseWithReturn, EUserState, EUserType } from '.'

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
