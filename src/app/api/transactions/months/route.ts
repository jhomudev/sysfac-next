import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EOperationType, TransactionMonthDB, TransactionsMonthRes } from '@/types'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const sales = await conn.query<TransactionMonthDB[]>(`
    SELECT MONTH(createdAt) AS month, COUNT(*) AS quantity FROM TRANSACTIONS
    WHERE operationType="${EOperationType.sell}" GROUP BY month ORDER BY month
    `)
    const purchases = await conn.query<TransactionMonthDB[]>(`
    SELECT MONTH(createdAt) AS month, COUNT(*) AS quantity FROM TRANSACTIONS
    WHERE operationType="${EOperationType.buy}" GROUP BY month ORDER BY month
    `)

    if (sales && purchases) {
      return NextResponse.json<ApiResponseWithReturn<TransactionsMonthRes>>({
        ok: true,
        message: 'data obtenida',
        data: {
          sales, purchases
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
