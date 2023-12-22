import { ApiResponse, SupplierToDB } from '@/types'
import axios from 'axios'

const updateSupplier = async (supplierId: number, data: SupplierToDB) => {
  try {
    const res = await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default updateSupplier
