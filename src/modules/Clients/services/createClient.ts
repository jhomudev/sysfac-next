import { ApiResponse, ClientToDB } from '@/types'
import axios from 'axios'

const createClient = async (data: ClientToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/clients`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default createClient
