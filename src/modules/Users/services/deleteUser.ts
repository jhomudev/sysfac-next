import { API_URL } from '@/contants'
import { ApiResponse } from '@/types'
import axios from 'axios'

const deleteUser = async (userId: number) => {
  try {
    const res = await axios.delete<ApiResponse>(`${API_URL}/users/${userId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default deleteUser
