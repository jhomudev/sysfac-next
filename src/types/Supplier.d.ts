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

export interface SupplierDB {
  supplierId: number,
  ruc: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt?: string
  updatedAt?: string
}

export type SuplierResponse = ApiResponseWithReturn<SupplierDB>
