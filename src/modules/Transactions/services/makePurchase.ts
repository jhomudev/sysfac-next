import { ApiResponse, OperationToDB, PurchaseToDB } from '@/types'
import axios from 'axios'

const makePurchase = async (data: PurchaseToDB, operations: OperationToDB[]) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, { ...data, operations })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default makePurchase
