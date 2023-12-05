import { EOperationType } from '.'
import { ApiResponseWithReturn } from './ApiResponse'

export interface Operation {
  id: number,
  description: string,
  serialNumber: string,
  unitCost: number,
  quantity: number,
  importSale: number,
  details: string,
  transactionId: number,
  productId: number,
  createdAt: string
}

export interface OperationFromDB {
  operationId: number,
  description: string,
  serialNumber: string,
  unitCost: number,
  quantity: number,
  importSale: number,
  details: string,
  productId: number,
  transactionId: number,
  createdAt: string
}

export interface OperationToDB {
  operationType: EOperationType
  description: string,
  serialNumber: string,
  unitCost: number,
  quantity: number,
  importSale: number,
  details: string,
  productId: number,
  transactionId: number,
}
