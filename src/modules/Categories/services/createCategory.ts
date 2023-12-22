import { ApiResponse, CategoryToDB } from '@/types'
import axios from 'axios'

const createCategory = async (data: CategoryToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/categories`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default createCategory
