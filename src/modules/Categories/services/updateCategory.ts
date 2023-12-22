import { ApiResponse, CategoryToDB } from '@/types'
import axios from 'axios'

const updateCategory = async (slug: string, data: CategoryToDB) => {
  try {
    const res = await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default updateCategory
