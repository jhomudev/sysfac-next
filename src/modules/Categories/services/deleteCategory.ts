import { ApiResponse } from '@/types'
import axios from 'axios'

const deleteCategory = async (slug: string) => {
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default deleteCategory
