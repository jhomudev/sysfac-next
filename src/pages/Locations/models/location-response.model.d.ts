import { ApiResponseWithReturn, ELocationType } from '@/models'

export interface LocationDB {
  localId: number,
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
  createdAt?: string
  updatedAt?: string
}

export type LocationResponse = ApiResponseWithReturn<LocationDB>
