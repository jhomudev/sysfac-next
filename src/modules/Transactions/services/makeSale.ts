import { ApiResponse, SaleToDB } from '@/types'
import axios from 'axios'

const makeSale = async (data: SaleToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/sales`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default makeSale
