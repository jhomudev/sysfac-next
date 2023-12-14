import { Supplier, SupplierFromDB } from '@/types'

function formatSupplier (res: SupplierFromDB): Supplier {
  const formatedSupplier: Supplier = {
    id: res.supplierId,
    ruc: res.ruc,
    name: res.name,
    address: res.address,
    phone: res.phone,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  }
  return formatedSupplier
}
export default formatSupplier
