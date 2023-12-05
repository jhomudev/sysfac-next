import { ApiResponseWithReturn } from './ApiResponse'

export interface Supplier {
  id: number,
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt: string
  updatedAt: string
}

export interface SupplierFromDB {
  supplierId: number,
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt: string
  updatedAt: string
}

export interface SupplierToDB {
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
}
