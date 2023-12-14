import { Purchase, PurchaseResponse } from '@/types'

const formatPurchase = (res: PurchaseResponse): Purchase => {
  const formatedPurchase: Purchase = {
    id: res.purchaseId,
    totalPay: res.totalPay,
    supplier: {
      id: res.supplier.id,
      name: res.supplier.name
    },
    user: {
      id: res.user.id,
      username: res.user.username,
      fullname: res.user.fullname
    },
    comments: res.comments,
    createdAt: res.createdAt
  }
  return formatedPurchase
}

export default formatPurchase
