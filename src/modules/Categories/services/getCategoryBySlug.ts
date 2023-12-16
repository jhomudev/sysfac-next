import { formatCategory } from '@/adapters'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Category, CategoryFromDB } from '@/types'
import axios from 'axios'

const getCategoryBySlug = async (slug: string): Promise<Category | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<CategoryFromDB>>(`${API_URL}/categories/${slug}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const catFormated = formatCategory(data.data)

    return catFormated
  } catch (error) {
    console.error(error)
  }
}

export default getCategoryBySlug
