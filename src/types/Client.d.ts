import { ApiResponseWithReturn } from './ApiResponse'

export interface Client {
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

export interface ClientFromDB {
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

export interface ClientToDB {
  ruc: `${number}` | undefined,
  dni: `${number}` | undefined,
  names: string,
  lastnames: string,
  address: string | null,
  phone: `${number}` | null,
}

export type ClientResponse = ApiResponseWithReturn<ClientFromDB>
