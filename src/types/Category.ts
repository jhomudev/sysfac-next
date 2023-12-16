import { ApiResponseWithReturn } from './ApiResponse'

export type Category = {
  id: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export type CategoryFromDB = {
  categoryId: number,
  slug: string,
  name: string,
  image: string,
  createdAt: string
  updatedAt: string
}

export type CategoryToDB = {
  slug: string,
  name: string,
  image: string
}
