import { ApiResponse, UserToDB } from '@/types'
import axios from 'axios'

const updateUser = async (username: string, data: Partial<UserToDB>) => {
  try {
    const res = await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default updateUser
