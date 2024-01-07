import { ApiResponse, OperationToDB, SaleToDB } from '@/types'
import axios from 'axios'

const makeSale = async (data: SaleToDB, operations: OperationToDB[]) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/sales`, { ...data, operations })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default makeSale
