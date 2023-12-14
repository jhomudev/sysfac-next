import { formatOperation } from '@/adapters'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Operation, OperationFromDB } from '@/types'
import axios from 'axios'

const getOperationsByTransactionId = async (id: `${number}` | number): Promise<Operation[] | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<OperationFromDB[]>>(`${API_URL}/operations?transactionId=${id}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const formatedOps = data.data.map(op => formatOperation(op))

    return formatedOps
  } catch (error) {
    console.error(error)
  }
}

export default getOperationsByTransactionId
