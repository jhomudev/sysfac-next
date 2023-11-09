import { number } from 'zod'
import { EOperationType, EProofType, ESaleFor, EUserState, EUserType } from './enumDB'

export type TUserCredentials = {
  username: string,
  password: string
}

export type TUser = {
  userId: number,
  username: string,
  password: string,
  type: EUserType,
  state: EUserState,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null,
  createdAt?: string
}

export type TClient = {
  clientId: number,
  RUC: `${number}` | null,
  dni: `${number}` | null,
  names: string,
  lastnames: string,
  address: string | null,
  phone: `${number}` | null,
  createdAt?: string,
  updateAt?: string
}

export type TTransactions = {
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
    names:string,
    lastnames:string,
  },
  user: {
    id: number,
    username: string,
    names: string,
    lastnames: string
  },
  createdAt: string
}

export type TCategory = {
  categoryId: number,
  slug: string,
  name: string,
  image?: string
}

export type TProduct = {
  productId: number,
  name: string,
  image: string,
  inventaryMin: number,
  priceSale: number,
  unit: string,
  saleFor: ESaleFor,
  isActive: boolean,
  category: {
    id: number,
    slug: string,
    name: string,
  }
  createdAt?: string,
  updateAt?: string
}
