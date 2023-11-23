import { ApiResponseWithReturn } from './ApiResponse'

export interface Category {
  id: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export interface CategoryDB {
  categoryId: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export type CategoryResponse = ApiResponseWithReturn<CategoryDB>
