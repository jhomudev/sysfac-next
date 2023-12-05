import { SaleFromDB, SaleResponse } from '@/types'

const formatSaleResponse = (res: SaleFromDB): SaleResponse => {
  const {
    saleId,
    totalImport,
    discount,
    totalPay,
    proofCode,
    proofType,
    clientId,
    clientDni,
    clientFullname,
    userId,
    username,
    userFullname,
    comments,
    createdAt
  } = res
  const saleFormated: SaleResponse = {
    saleId,
    totalImport,
    discount,
    totalPay,
    proofCode,
    proofType,
    client: {
      id: clientId,
      dni: clientDni,
      fullname: clientFullname
    },
    user: {
      id: userId,
      fullname: userFullname,
      username
    },
    comments,
    createdAt
  }

  return saleFormated
}
export default formatSaleResponse
