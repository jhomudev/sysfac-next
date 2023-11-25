import { formatUser } from '@/adapters'
import { API_URL } from '@/contants'
import { UserResponse, UserCredentials, EUserState } from '@/types'
import axios from 'axios'

export const validateUserCredentials = async (credentials: UserCredentials) => {
  try {
    const res = await axios.post<UserResponse>(`${API_URL}/auth/login`, credentials)
    if (!res.data.ok) return
    const user = formatUser(res.data)

    return {
      access: !!user,
      isActive: user.state === EUserState.active,
      data: user
    }
  } catch (error) {
    console.log(error)
  }
}
