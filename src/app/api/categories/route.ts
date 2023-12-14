import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, CategoryFromDB, CategoryToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      likeColumn: 'name',
      orderByColumn: 'categoryId',
      paramsCols: [],
      URLSearchParams
    })
    const categories = await conn.query<CategoryFromDB[]>(`SELECT categoryId, name, slug, image, createdAt, updatedAt FROM CATEGORIES ${queryParamsComplete}`)
    const categoriesNoLimit = await conn.query<CategoryFromDB[]>(`SELECT categoryId, name, slug, image, createdAt, updatedAt FROM CATEGORIES ${queryParamsNoLimit}`)
    const totalCategories = await conn.query<CategoryFromDB[]>('SELECT categoryId, name, slug, image, createdAt, updatedAt FROM CATEGORIES')

    if (categories) {
      return NextResponse.json<ApiResponseWithReturn<CategoryFromDB[]>>({
        ok: true,
        message: 'Categorias encontradas',
        data: categories,
        meta: {
          rowsObtained: categoriesNoLimit.length,
          totalRows: totalCategories.length,
          page,
          rowsPerPage
        }
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Error en la consulta'
    }, { status: 400 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { image, name, slug }: CategoryToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO CATEGORIES SET ?', { image, name, slug })
    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Categoria creada',
        data: {
          insertId: resDB.insertId,
          image,
          name,
          slug
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Error en la consulta'
    }, { status: 400 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
