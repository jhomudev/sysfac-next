import { formatPurchase } from '@/adapters'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Purchase, PurchaseResponse } from '@/types'
import axios from 'axios'

const getSaleById = async (id: `${number}` | number): Promise<Purchase | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<PurchaseResponse>>(`${API_URL}/purchases/${id}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const formatedPurchase = formatPurchase(data.data)

    return formatedPurchase
  } catch (error) {
    console.error(error)
  }
}

export default getSaleById
