import { EStateProductUnit } from '.'

export interface UnitInventary {
  id: number
  serialNumber: string
  state: EStateProductUnit
  product: {
    id: number
    name: string
  }
  location: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface UnitInventaryFromDB {
  unitId: number
  serialNumber: string
  state: EStateProductUnit
  productId: number
  productName: string
  localId: number
  locationName: string
  createdAt: string
  updatedAt: string
}

export interface UnitInventaryToDB {
  serialNumber: string
  state: EStateProductUnit
  productId: number
  localId: number
}

export interface UnitInventaryResponse {
  unitId: number
  serialNumber: string
  state: EStateProductUnit
  product: {
    id: number
    name: string
  }
  location: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
}

export type UnitPerStateRes = {
  stock: {
    quantity: number
  },
  sold: {
    quantity: number
  },
  damaged: {
    quantity: number
  },
}

export type UnitPerState = {
  stock: number
  sold: number
  damaged: number
}
