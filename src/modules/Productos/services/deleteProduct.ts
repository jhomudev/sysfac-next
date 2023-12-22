import { ApiResponse, ProductToDB } from '@/types'
import axios from 'axios'

const deleteProduct = async (productId: number) => {
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default deleteProduct
