import { ApiResponseWithReturn, ESaleFor } from '@/models'

export interface CategoryDB {
  categoryId: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export type CategoryResponse = ApiResponseWithReturn<CategoryDB>
