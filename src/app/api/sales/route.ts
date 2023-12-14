import { formatSaleResponse } from '@/adapters'
import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EOperationType, SaleFromDB, SaleResponse, SaleToDB } from '@/types'
import { getQueryParams } from '@/types/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      likeColumn: 'CONCAT(cli.names," ", cli.lastnames)',
      orderByColumn: 'transactionId',
      paramsCols: ['us.username', 'operationType', 'proofType'],
      URLSearchParams
    })
    const sales = await conn.query<SaleFromDB[]>(`
    SELECT tran.transactionId as saleId, tran.proofType, tran.proofCode, tran.totalImport, tran.discount, tran.totalPay, tran.comments, tran.createdAt,
    cli.clientId, cli.dni as clientDni, CONCAT(cli.names," ", cli.lastnames) as clientFullname,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname
    FROM TRANSACTIONS tran
    INNER JOIN CLIENTS cli ON cli.clientId = tran.clientId
    INNER JOIN USERS us ON us.userId = tran.userId
    ${queryParamsComplete}`)

    const salesNoLimit = await conn.query<SaleFromDB[]>(`
    SELECT tran.transactionId, tran.proofType, tran.proofCode, tran.totalImport, tran.discount, tran.totalPay, tran.comments, tran.createdAt,
    cli.clientId, cli.dni as clientDni, CONCAT(cli.names," ", cli.lastnames) as clientFullname,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname
    FROM TRANSACTIONS tran
    INNER JOIN CLIENTS cli ON cli.clientId = tran.clientId
    INNER JOIN USERS us ON us.userId = tran.userId
    ${queryParamsNoLimit}`)
    const totalSales = await conn.query<SaleFromDB[]>('SELECT transactionId FROM TRANSACTIONS WHERE operationType = ?', [EOperationType.sell])

    if (sales) {
      const salesFormated = sales.map(sale => formatSaleResponse(sale))
      return NextResponse.json<ApiResponseWithReturn<SaleResponse[]>>({
        ok: true,
        message: 'Ventas encontradas',
        data: salesFormated,
        meta: {
          rowsObtained: salesNoLimit.length,
          totalRows: totalSales.length,
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
    const data: SaleToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO TRANSACTIONS SET ?', {
      ...data,
      operationtype: EOperationType.sell
    })

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Venta realizada',
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
