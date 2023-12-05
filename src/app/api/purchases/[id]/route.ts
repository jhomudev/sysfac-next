import { formatPurchaseResponse } from '@/adapters'
import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, PurchaseFromDB, PurchaseResponse } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const [purchase] = await conn.query<PurchaseFromDB[]>(`
    SELECT tran.transactionId as purchaseId, tran.totalPay, tran.comments, tran.createdAt,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname,
    sup.supplierId, sup.name as supplierName
    FROM TRANSACTIONS tran
    INNER JOIN SUPPLIERS sup ON sup.supplierId = tran.supplierId
    INNER JOIN USERS us ON us.userId = tran.userId
    WHERE transactionId = ?`, id)

    if (purchase) {
      const purchaseFormated = formatPurchaseResponse(purchase)
      return NextResponse.json<ApiResponseWithReturn<PurchaseResponse>>({
        ok: true,
        message: 'Compra encontrada',
        data: purchaseFormated
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Compra no encontrada'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
