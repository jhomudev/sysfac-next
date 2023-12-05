import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EOperationType, PurchaseFromDB, PurchaseResponse, PurchaseToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'
import { formatPurchaseResponse } from '@/adapters'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit } = getQueryParams({
      likeColumn: 'CONCAT(us.names," ", us.lastnames)',
      orderByColumn: 'transactionId',
      paramsCols: ['operationType'],
      URLSearchParams
    })
    const purchases = await conn.query<PurchaseFromDB[]>(`
    SELECT tran.transactionId as purchaseId, tran.totalPay, tran.comments, tran.createdAt,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname,
    sup.supplierId, sup.name as supplierName
    FROM TRANSACTIONS tran
    INNER JOIN SUPPLIERS sup ON sup.supplierId = tran.supplierId
    INNER JOIN USERS us ON us.userId = tran.userId
    ${queryParamsComplete}`)

    const purchasesNoLimit = await conn.query<PurchaseFromDB[]>(`
    SELECT tran.transactionId as purchaseId, tran.totalPay, tran.comments, tran.createdAt,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname,
    sup.supplierId, sup.name as supplierName
    FROM TRANSACTIONS tran
    INNER JOIN SUPPLIERS sup ON sup.supplierId = tran.supplierId
    INNER JOIN USERS us ON us.userId = tran.userId
    ${queryParamsNoLimit}`)
    const totalPurchases = await conn.query<PurchaseFromDB[]>('SELECT transactionId FROM TRANSACTIONS WHERE operationType = ?', [EOperationType.buy])

    if (purchases) {
      const purchasesFormated = purchases.map(purchase => formatPurchaseResponse(purchase))
      return NextResponse.json<ApiResponseWithReturn<PurchaseResponse[]>>({
        ok: true,
        message: 'Compras encontradas',
        data: purchasesFormated,
        meta: {
          rowsObtained: purchasesNoLimit.length,
          totalRows: totalPurchases.length
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
    const data: PurchaseToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO TRANSACTIONS SET ?', {
      ...data,
      operationtype: EOperationType.buy
    })

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Compra realizada',
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
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
