import { ApiResponse, PurchaseToDB } from '@/types'
import axios from 'axios'

const makePurchase = async (data: PurchaseToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default makePurchase
