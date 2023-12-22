import { ApiResponse } from '@/types'
import axios from 'axios'

const deleteSupplier = async (supplierId: number) => {
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default deleteSupplier
