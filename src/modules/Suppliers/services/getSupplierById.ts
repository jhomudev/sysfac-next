import { formatSupplier } from '@/adapters'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Supplier, SupplierFromDB } from '@/types'
import axios from 'axios'

const getSupplierById = async (id: `${number}` | number): Promise<Supplier | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<SupplierFromDB>>(`${API_URL}/suppliers/${id}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const supplierFormated = formatSupplier(data.data)

    return supplierFormated
  } catch (error) {
    console.error(error)
  }
}

export default getSupplierById
