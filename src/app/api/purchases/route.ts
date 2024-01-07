import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EOperationType, EStateProductUnit, OperationToDB, PurchaseFromDB, PurchaseResponse, PurchaseToDB, UnitInventaryToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'
import { formatPurchaseResponse } from '@/adapters'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
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
          totalRows: totalPurchases.length,
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
    const { operations, ...data }: PurchaseToDB & { operations: OperationToDB[] } = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO TRANSACTIONS SET ?', {
      ...data,
      operationtype: EOperationType.buy
    })

    if (resDB.affectedRows > 0) {
      const OperationsPromises = operations.map(async operation => conn.query<OkPacket>('INSERT INTO OPERATIONS SET ?', [{
        ...operation,
        operationType: EOperationType.buy,
        transactionId: resDB.insertId
      }]))

      const opsToUnitInv: UnitInventaryToDB[] = []
      operations.forEach(operation => {
        return Array.from({ length: operation.quantity }).forEach(() => {
          const unit = {
            serialNumber: operation.serialNumber,
            productId: operation.productId
          }
          const unitClear = Object.fromEntries(Object.entries(unit).filter(([_, valor]) => valor !== undefined && valor !== null && valor !== '')) as UnitInventaryToDB
          opsToUnitInv.push(unitClear)
        })
      })
      const InventaryPromises = opsToUnitInv.map(async unit => conn.query<OkPacket>('INSERT INTO INVENTARY SET ?', [unit]))
      const resAddInv = await Promise.all(InventaryPromises)
      const resOps = await Promise.all(OperationsPromises)
      const opsInserted = resOps.every(res => res.affectedRows > 0)
      const unitsInvInserted = resAddInv.every(res => res.affectedRows > 0)
      if (opsInserted && unitsInvInserted) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'Compra realizada',
          data: {
            insertId: resDB.insertId,
            ...data
          }
        })
      }
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
