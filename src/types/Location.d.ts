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

export interface LocationFromDB {
  localId: number,
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
  createdAt: string
  updatedAt: string
}

export interface LocationToDB {
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
}

export type LocationResponse = ApiResponseWithReturn<LocationFromDB>
