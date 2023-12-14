import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, BestProductsRes, EOperationType, ProductWithOpsFromDB } from '@/types'
import { NextResponse } from 'next/server'
export const GET = async () => {
  try {
    const data = Object.values(EOperationType).map(async operationType => {
      const res = await conn.query<ProductWithOpsFromDB[]>(`SELECT  pro.name as product, (
        SELECT COUNT(*) FROM OPERATIONS op 
        WHERE op.productId=pro.productId AND op.operationType="${operationType}") AS totalOperations
        FROM PRODUCTS pro ORDER BY totalOperations DESC LIMIT 6`)
      return res
    })

    const [bestPerpurchases, bestPersales] = await Promise.all(data)
    if (bestPerpurchases && bestPersales) {
      return NextResponse.json<ApiResponseWithReturn<BestProductsRes>>({
        ok: true,
        message: 'data obtenida',
        data: { bestPerpurchases, bestPersales }
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
