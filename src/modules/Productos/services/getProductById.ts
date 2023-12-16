import { formatProduct } from '@/adapters'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Product, ProductResponse } from '@/types'
import axios from 'axios'

const getProductById = async (id: `${number}` | number): Promise<Product | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<ProductResponse>>(`${API_URL}/products/${id}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const productFormated = formatProduct(data.data)

    return productFormated
  } catch (error) {
    console.error(error)
  }
}

export default getProductById
