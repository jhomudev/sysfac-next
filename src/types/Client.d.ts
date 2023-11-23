import { ApiResponseWithReturn } from './ApiResponse'

export interface Client {
  id: number,
  RUC: `${number}` | null,
  dni: `${number}` | null,
  names: string,
  lastnames: string,
  address: string | null,
  phone: `${number}` | null,
  createdAt: string,
  updatedAt: string
}

export interface ClientDB {
  clientId: number,
  RUC: `${number}` | null,
  dni: `${number}` | null,
  names: string,
  lastnames: string,
  address: string | null,
  phone: `${number}` | null,
  createdAt: string,
  updateAt: string
}

export type ClientResponse = ApiResponseWithReturn<ClientDB>
