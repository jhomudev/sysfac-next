import { API_URL } from '@/contants'
import { ApiResponse, UserToDB } from '@/types'
import axios from 'axios'

const updateUser = async (userId: number, data: UserToDB) => {
  try {
    const res = await axios.put<ApiResponse>(`${API_URL}/users/${userId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default updateUser
