import { formatUser } from '@/adapters'
import { API_URL } from '@/contants'
import { UserCredentials, EUserState, ApiResponseWithReturn, UserFromDB } from '@/types'
import axios from 'axios'

export const validateUserCredentials = async (credentials: UserCredentials) => {
  try {
    const res = await axios.post<ApiResponseWithReturn<UserFromDB>>(`${API_URL}/auth/login`, credentials)
    if (!res.data.ok) return
    const user = formatUser(res.data.data)
    return {
      access: !!user,
      isActive: user.state === EUserState.active,
      data: user
    }
  } catch (error) {
    console.log(error)
  }
}
