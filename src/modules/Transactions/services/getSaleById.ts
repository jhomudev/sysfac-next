import { formatSale } from '@/adapters'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Sale, SaleResponse } from '@/types'
import axios from 'axios'

const getSaleById = async (id: `${number}` | number): Promise<Sale | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<SaleResponse>>(`${API_URL}/sales/${id}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const saleFormated = formatSale(data.data)

    return saleFormated
  } catch (error) {
    console.error(error)
  }
}

export default getSaleById
