import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, ProductFromDB, ProductResponse, ProductToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'
import { formatProductResponse } from '@/adapters'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      URLSearchParams: searchParams,
      likeColumn: 'prod.name',
      orderByColumn: 'prod.productId',
      paramsCols: ['prod.saleFor', 'prod.isActive', 'cat.categoryId', 'cat.slug']
    })

    const products = await conn.query<ProductFromDB[]>(`
    SELECT prod.productId, prod.name, prod.image, prod.inventaryMin, prod.priceSale, prod.unit, prod.saleFor, prod.isActive, prod.createdAt, prod.updatedAt,
    cat.categoryId, cat.name as categoryName, cat.slug as categorySlug 
    FROM PRODUCTS prod INNER JOIN CATEGORIES cat ON cat.categoryId=prod.categoryId
    ${queryParamsComplete}
    `)

    const productsNoLimit = await conn.query<ProductFromDB[]>(`
    SELECT prod.productId FROM PRODUCTS prod INNER JOIN CATEGORIES cat ON cat.categoryId=prod.categoryId
    ${queryParamsNoLimit}
    `)

    const totalProducts = await conn.query<ProductFromDB[]>('SELECT productId FROM PRODUCTS')

    if (products) {
      const productsFormated = products.map(prod => formatProductResponse(prod))
      return NextResponse.json<ApiResponseWithReturn<ProductResponse[]>>({
        ok: true,
        message: 'Productos obtenidos',
        data: productsFormated,
        meta: {
          rowsObtained: productsNoLimit.length,
          totalRows: totalProducts.length,
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
      message: 'Ocurrió un problema',
      error
    }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const data: ProductToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO PRODUCTS SET ?', data)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Producto creado',
        data: {
          insertId: resDB.insertId,
          ...data
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Error en la consulta'
    }, { status: 400 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      message: 'Ocurrió un problema',
      error
    }, { status: 500 })
  }
}
