import { ApiResponseWithReturn } from './ApiResponse'

export interface Operation {
  id: number,
  description: string,
  serialNumber: string,
  priceSale: number,
  quantity: number,
  importSale: number,
  details: string,
  transactionId: number,
  createdAt: string
}

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
