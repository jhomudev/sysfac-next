import { ApiResponse, OperationToDB } from '@/types'
import axios from 'axios'

const addOperation = async (data: OperationToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/operations`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default addOperation
