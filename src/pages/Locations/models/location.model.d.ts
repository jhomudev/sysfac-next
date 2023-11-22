import { ELocationType } from '@/models'

export interface Location {
  id: number,
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: boolean,
  createdAt: string
  updatedAt: string
}
