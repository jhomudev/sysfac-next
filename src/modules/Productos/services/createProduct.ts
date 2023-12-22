import { ApiResponse, ProductToDB } from '@/types'
import axios from 'axios'

const createProduct = async (data: ProductToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/products`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default createProduct
