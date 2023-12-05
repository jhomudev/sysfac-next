import { ApiResponseWithReturn } from './ApiResponse'
import { EOperationType, EProofType } from './enums'

export interface Transaction {
  id: number,
  operationType: EOperationType,
  totalPay: number,
  comments: string,
  user: {
    id: number,
    username: string,
    fullname: string
  },
  createdAt: string,
}

export interface TransactionFromDB {
  transactionId: number,
  operationType: EOperationType,
  totalPay: number,
  comments: string,
  userId: number,
  username: string,
  userFullname: string
  createdAt: string,
}

// export interface TransactionToDB {
//   operationType: EOperationType,
//   totalPay: number,
//   comments: string,
//   supplierId: number,
//   clientId: number,
//   userId: number,
// }

export type TransactionResponse = {
  transactionId: number,
  operationType: EOperationType,
  totalPay: number,
  comments: string,
  user: {
    id: number,
    username: string,
    fullname: string
  },
  createdAt: string,
}
