import { formatUser } from '@/adapters'
import { API_URL } from '@/libs/utils'
import { EUserState, UserCredentials, UserResponse } from '@/models'
import axios from 'axios'

export const validateUserCredentials = async (credentials: UserCredentials) => {
  const res = await axios.post<UserResponse>(`${API_URL}/auth/login`, credentials)
  const user = formatUser(res.data)

  return {
    access: !!user,
    isActive: user.state === EUserState.active,
    data: user
  }
}
