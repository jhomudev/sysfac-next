import { ApiResponseWithReturn } from './ApiResponse'
import { EOperationType, EProofType } from './enums'

export type Transaction = {
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

export type TransactionFromDB = {
  transactionId: number,
  operationType: EOperationType,
  totalPay: number,
  comments: string,
  userId: number,
  username: string,
  userFullname: string
  createdAt: string,
}

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

export type TransactionMonthDB = {
  month: number,
  quantity: number
}

export type TransactionMonth = {
  month: number,
  quantity: number
}

export type TransactionsMonthRes = {
  sales: TransactionMonthDB[],
  purchases: TransactionMonthDB[]
}

export type TransactionsMonth = {
  sales: TransactionMonth[],
  purchases: TransactionMonth[]
}
