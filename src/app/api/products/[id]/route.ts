import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, ProductFromDB, ProductResponse, ProductToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'
import { formatProductResponse } from '@/adapters'

export const GET = async (_req: NextRequest, { params }: {params: { id: string}}) => {
  try {
    const productId = params.id
    const [product] = await conn.query<ProductFromDB[]>(` 
    SELECT prod.productId, prod.name, prod.image, prod.inventaryMin, prod.priceSale, prod.unit, prod.saleFor, prod.isActive, prod.createdAt, prod.updatedAt,
    cat.categoryId, cat.name as categoryName, cat.slug as categorySlug 
    FROM PRODUCTS prod INNER JOIN CATEGORIES cat ON cat.categoryId=prod.categoryId 
    WHERE productId = ?`, [productId])

    if (product) {
      const productFormated = formatProductResponse(product)
      return NextResponse.json<ApiResponseWithReturn<ProductResponse>>({
        ok: true,
        message: 'Producto encontrado',
        data: productFormated
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Producto no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      message: 'Ocurrió un problema',
      error
    }, { status: 500 })
  }
}

export const PUT = async (req: NextRequest, { params }:{ params: {id: number}}) => {
  try {
    const { id: productId } = params
    const { name, image, inventaryMin, priceSale, unit, saleFor, isActive, categoryId }: ProductToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE PRODUCTS SET ? WHERE productId = ?', [{ name, image, inventaryMin, priceSale, unit, saleFor, isActive, categoryId }, productId])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Producto modificado',
        data: {
          id: productId,
          name,
          image,
          inventaryMin,
          priceSale,
          unit,
          saleFor,
          isActive,
          categoryId
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Producto no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      message: 'Ocurrió un problema',
      error
    }, { status: 500 })
  }
}

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params

    // validate that product has transactions
    const [res] = await conn.query<any[]>(`SELECT COUNT(*) AS totalOps FROM OPERATIONS op
    INNER JOIN PRODUCTS pro ON pro.productId = op.productId
    WHERE op.productId = ?`, id)
    const { totalOps } = res

    if (totalOps > 0) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'No se puede eliminar un producto que tenga transacciones'
      })
    }

    // delete product
    const resDB = await conn.query<OkPacket>('DELETE FROM PRODUCTS WHERE productId = ?', id)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Producto eliminado'
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Producto no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
