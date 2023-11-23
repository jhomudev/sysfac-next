import { ApiResponseWithReturn } from './ApiResponse'
import { ESaleFor } from './enums'

export interface Product {
  id: number,
  name: string,
  image: string,
  inventaryMin: number,
  priceSale: number,
  unit: string,
  saleFor: ESaleFor,
  isActive: boolean,
  category: {
    id: number,
    slug: string,
    name: string,
  }
  createdAt: string,
  updateAt: string
}

export interface ProductDB {
  productId: number,
  name: string,
  image: string,
  inventaryMin: number,
  priceSale: number,
  unit: string,
  saleFor: ESaleFor,
  isActive: boolean,
  category: {
    id: number,
    slug: string,
    name: string,
  }
  createdAt: string,
  updateAt: string
}

export type ProductResponse = ApiResponseWithReturn<ProductDB>
