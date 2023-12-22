import { ApiResponseWithReturn } from './ApiResponse'
import { ESaleFor } from './enums'

export type Product = {
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
  updatedAt: string
}

export type ProductResponse = {
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
  updatedAt: string
}

export type ProductFromDB = {
  productId: number,
  name: string,
  image: string,
  inventaryMin: number,
  priceSale: number,
  unit: string,
  saleFor: ESaleFor,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
  categoryId: number,
  categorySlug: string,
  categoryName: string,
}

export type ProductToDB = {
  name: string,
  image?: string,
  inventaryMin: number,
  priceSale: number,
  unit: string,
  saleFor: ESaleFor,
  isActive: boolean,
  categoryId: number
}

export type ProductWithOpsFromDB = {
  product: string
  totalOperations: number
}

export type BestProductsRes = {
  bestPerpurchases: ProductWithOpsFromDB[]
  bestPersales: ProductWithOpsFromDB[]
}
export type ProductWithOps = {
  product: string
  totalOperations: number
}

export type BestProducts = {
  bestPerpurchases: ProductWithOps[]
  bestPersales: ProductWithOps[]
}

export type ProductWithQuantity = {
  id: number,
  name: string,
  inventaryMin: number,
  quantity: number
}
export type ProductWithQuantityFromDB = {
  productId: number,
  name: string,
  inventaryMin: number,
  quantity: number
}
