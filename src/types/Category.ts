import { ApiResponseWithReturn } from './ApiResponse'

export interface Category {
  id: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export interface CategoryFromDB {
  categoryId: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export interface CategoryToDB {
  slug: string,
  name: string,
  image: string
}

export type CategoryResponse = ApiResponseWithReturn<CategoryFromDB>
