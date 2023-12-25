import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EStateProductUnit, ProductWithQuantityFromDB } from '@/types'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const products = await conn.query<ProductWithQuantityFromDB[]>(`
    SELECT pro.productId, pro.name , pro.inventaryMin , 
    (SELECT COUNT(inv.productId) FROM INVENTARY inv 
    INNER JOIN PRODUCTS p ON p.productId=inv.productId 
    WHERE inv.productId=pro.productId AND inv.state="${EStateProductUnit.stock}") AS quantity
    FROM PRODUCTS pro WHERE isActive=1 ORDER BY quantity DESC`)

    if (products) {
      return NextResponse.json<ApiResponseWithReturn<ProductWithQuantityFromDB[]>>({
        ok: true,
        message: 'productos obtenidos',
        data: products
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
