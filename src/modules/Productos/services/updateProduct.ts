import { ApiResponse, ProductToDB } from '@/types'
import axios from 'axios'

const updateProduct = async (productId: number, data: ProductToDB) => {
  try {
    const res = await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default updateProduct
