import { ApiResponseWithReturn } from './ApiResponse'
import { ELocationType } from './enums'

export type Location ={
  id: number,
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
  createdAt: string
  updatedAt: string
}

export type LocationFromDB ={
  localId: number,
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
  createdAt: string
  updatedAt: string
}

export type LocationToDB = {
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
}
