import { formatSaleResponse } from '@/adapters'
import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, SaleFromDB, SaleResponse } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const [sale] = await conn.query<SaleFromDB[]>(`
    SELECT tran.transactionId as saleId, tran.proofType, tran.proofCode, tran.totalImport, tran.discount, tran.totalPay, tran.comments, tran.createdAt,
    cli.clientId, cli.dni as clientDni, CONCAT(cli.names," ", cli.lastnames) as clientFullname,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname
    FROM TRANSACTIONS tran
    INNER JOIN CLIENTS cli ON cli.clientId = tran.clientId
    INNER JOIN USERS us ON us.userId = tran.userId
    WHERE transactionId = ?`, id)

    if (sale) {
      const saleFormated = formatSaleResponse(sale)
      return NextResponse.json<ApiResponseWithReturn<SaleResponse>>({
        ok: true,
        message: 'Venta encontrada',
        data: saleFormated
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Venta no encontrada'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
