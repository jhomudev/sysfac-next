import { ApiResponseWithReturn, ESaleFor } from '@/models'

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
