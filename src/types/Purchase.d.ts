import { ApiResponseWithReturn } from './ApiResponse'
import { EOperationType, EProofType } from './enums'

export interface Purchase {
  id: number,
  totalPay: number,
  comments: string,
  supplier: {
    id: number,
    name: string,
  },
  user: {
    id: number,
    username: string,
    fullname: string
  },
  createdAt: string,
}

export interface PurchaseFromDB {
  purchaseId: number,
  totalPay: number,
  comments: string,
  supplierId: number,
  supplierName: string,
  userId: number,
  username: string,
  userFullname: string
  createdAt: string,
}

export interface PurchaseToDB {
  totalPay: number,
  comments: string,
  supplierId: number,
  userId: number,
}

export type PurchaseResponse = {
  purchaseId: number,
  totalPay: number,
  comments: string,
  supplier: {
    id: number,
    name: string,
  },
  user: {
    id: number,
    username: string,
    fullname: string
  },
  createdAt: string,
}
