import { ApiResponseWithReturn } from './ApiResponse'
import { ELocationType } from './enums'

export interface Location {
  id: number,
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
  createdAt: string
  updatedAt: string
}

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
