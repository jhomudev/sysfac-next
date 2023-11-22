import { ApiResponseWithReturn, EOperationType, EProofType } from '@/models'

export interface TransactionDB {
  transactionId: number,
  operationType: EOperationType,
  proofType: EProofType,
  proofCode: string,
  totalImport: number,
  discount: number,
  totalPay: number,
  comments: string,
  supplier: {
    id: number,
    name: string,
  },
  client: {
    id: number,
    dni: `${number}`,
    names: string,
    lastnames: string,
  },
  user: {
    id: number,
    username: string,
    names: string,
    lastnames: string
  },
  createdAt: string
}

export type TransactionResponse = ApiResponseWithReturn<TransactionDB>
