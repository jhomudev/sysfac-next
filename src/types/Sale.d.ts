import { ApiResponseWithReturn } from './ApiResponse'
import { EOperationType, EProofType } from './enums'

export interface Sale {
  id: number,
  proofType: EProofType,
  proofCode: string,
  totalImport: number,
  discount: number,
  totalPay: number,
  comments: string,
  client: {
    id: number,
    dni: `${number}`,
    fullname: string
  },
  user: {
    id: number,
    username: string,
    fullname: string
  },
  createdAt: string,
}

export interface SaleFromDB {
  saleId: number,
  proofType: EProofType,
  proofCode: string,
  totalImport: number,
  discount: number,
  totalPay: number,
  comments: string,
  clientId: number,
  clientDni: `${number}`,
  clientFullname: string,
  userId: number,
  username: string,
  userFullname: string
  createdAt: string,
}

export interface SaleToDB {
  proofType: EProofType,
  proofCode: string,
  totalImport: number,
  discount: number,
  totalPay: number,
  comments: string,
  clientId: number,
  userId: number,
}

export type SaleResponse = {
  saleId: number,
  proofType: EProofType,
  proofCode: string,
  totalImport: number,
  discount: number,
  totalPay: number,
  comments: string,
  client: {
    id: number,
    dni: `${number}`,
    fullname: string
  },
  user: {
    id: number,
    username: string,
    fullname: string
  },
  createdAt: string,
}
