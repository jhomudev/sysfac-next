import { ApiResponseWithReturn } from './ApiResponse'

export type Client = {
  id: number,
  ruc: `${number}` | null,
  dni: `${number}` | null,
  names: string,
  lastnames: string,
  address: string | null,
  phone: `${number}` | null,
  createdAt: string,
  updatedAt: string
}

export type ClientFromDB = {
  clientId: number,
  ruc: `${number}` | null,
  dni: `${number}` | null,
  names: string,
  lastnames: string,
  address: string | null,
  phone: `${number}` | null,
  createdAt: string,
  updatedAt: string
}

export type ClientToDB = {
  ruc: `${number}` | undefined,
  dni: `${number}` | undefined,
  names: string,
  lastnames: string,
  address?: string | null,
  phone?: `${number}` | null,
}
