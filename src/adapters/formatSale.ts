import { Sale, SaleResponse } from '@/types'

const formatSale = (res: SaleResponse): Sale => {
  const formatedSale: Sale = {
    id: res.saleId,
    totalImport: res.totalImport,
    discount: res.discount,
    totalPay: res.totalPay,
    proofCode: res.proofCode,
    proofType: res.proofType,
    client: {
      id: res.client.id,
      dni: res.client.dni,
      fullname: res.client.fullname
    },
    user: {
      id: res.user.id,
      username: res.user.username,
      fullname: res.user.fullname
    },
    comments: res.comments,
    createdAt: res.createdAt
  }
  return formatedSale
}

export default formatSale
