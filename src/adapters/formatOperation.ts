import { Operation, OperationFromDB } from '@/types'

const formatOperation = (res: OperationFromDB): Operation => {
  const formatedOperation: Operation = {
    id: res.operationId,
    description: res.description,
    serialNumber: res.serialNumber,
    unitCost: res.unitCost,
    quantity: res.quantity,
    importSale: res.importSale,
    details: res.details,
    productId: res.productId,
    transactionId: res.transactionId,
    createdAt: res.createdAt
  }
  return formatedOperation
}

export default formatOperation
