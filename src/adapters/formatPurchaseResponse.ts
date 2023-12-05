import { PurchaseFromDB, PurchaseResponse } from '@/types'

function formatPurchaseResponse (res: PurchaseFromDB): PurchaseResponse {
  const {
    purchaseId,
    totalPay,
    supplierId,
    supplierName,
    userId,
    userFullname,
    username,
    comments,
    createdAt
  } = res
  const purchaseFormated: PurchaseResponse = {
    purchaseId,
    totalPay,
    supplier: {
      id: supplierId,
      name: supplierName
    },
    user: {
      id: userId,
      fullname: userFullname,
      username
    },
    comments,
    createdAt
  }

  return purchaseFormated
}
export default formatPurchaseResponse
