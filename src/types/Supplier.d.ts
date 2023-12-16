import { ApiResponseWithReturn } from './ApiResponse'

export type Supplier = {
  id: number,
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt: string
  updatedAt: string
}

export type SupplierFromDB = {
  supplierId: number,
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt: string
  updatedAt: string
}

export type SupplierToDB = {
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
}
