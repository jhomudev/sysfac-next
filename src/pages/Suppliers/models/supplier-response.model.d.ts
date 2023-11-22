import { ApiResponseWithReturn } from '@/models'

export interface SupplierDB {
  supplierId: number,
  RUC: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt?: string
  updatedAt?: string
}

export type SuplierResponse = ApiResponseWithReturn<SupplierDB>
