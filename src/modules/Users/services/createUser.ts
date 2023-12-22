import { ApiResponse, UserToDB } from '@/types'
import axios from 'axios'

const createUser = async (data: UserToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default createUser
