import { ApiResponseWithReturn } from '@/models'

export interface OperationDB {
  operationId: number,
  description: string,
  serialNumber: string,
  priceSale: number,
  quantity: number,
  importSale: number,
  details: string,
  transactionId: number,
  createdAt: string
}

export type OperationResponse = ApiResponseWithReturn<OperationDB>
