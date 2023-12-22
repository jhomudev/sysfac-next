import { ApiResponse, SupplierToDB } from '@/types'
import axios from 'axios'

const createSupplier = async (data: SupplierToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default createSupplier
