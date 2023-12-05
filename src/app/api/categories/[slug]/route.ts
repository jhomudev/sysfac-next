import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, CategoryFromDB, CategoryToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (_req: NextRequest, { params }: { params: { slug: string}}) => {
  try {
    const { slug } = params
    const [category] = await conn.query<CategoryFromDB[]>(`
    SELECT categoryId, name, slug, image, createdAt, updatedAt 
    FROM CATEGORIES WHERE slug = ?`, slug)

    if (category) {
      return NextResponse.json<ApiResponseWithReturn<CategoryFromDB>>({
        ok: true,
        message: 'Categoria encontrada',
        data: category
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Categoría no encontrada'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}

export const PUT = async (req: NextRequest, { params }: { params: { slug: string}}) => {
  try {
    const { slug: catSlug } = params
    const { image, name, slug }: CategoryToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE CATEGORIES SET ? WHERE slug = ?', [{ image, name, slug }, catSlug])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Categoría modificada',
        data: {
          slugPrev: catSlug,
          image,
          name,
          slug
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Categoría no encontrada'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}

export const DELETE = async (_req: NextRequest, { params }: { params: { slug: string}}) => {
  try {
    const { slug } = params
    const resDB = await conn.query<OkPacket>('DELETE FROM CATEGORIES WHERE slug = ?', slug)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Categoría eliminada'
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Categoría no encontrada'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
