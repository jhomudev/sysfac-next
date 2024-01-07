import { EStateProductUnit } from '.'

export type UnitInventary = {
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

export type UnitInventaryFromDB = {
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

export type UnitInventaryToDB = {
  serialNumber?: string
  state?: EStateProductUnit
  productId: number
  localId?: number
}

export type UnitInventaryResponse = {
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
