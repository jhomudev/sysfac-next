import { ApiResponse } from '@/types'
import axios from 'axios'
import { Stringifier } from 'postcss'

const deleteUser = async (username: string) => {
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default deleteUser
