import { conn } from '@/libs/mysql'
import { fillMonthsInTransactions } from '@/modules/Transactions/utils'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EOperationType, TransactionMonthDB, TransactionsMonthRes } from '@/types'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const year = new Date().getFullYear()
  try {
    let sales = await conn.query<TransactionMonthDB[]>(`
    SELECT MONTH(createdAt) AS month, COUNT(*) AS quantity FROM TRANSACTIONS
    WHERE operationType="${EOperationType.sell}" AND YEAR(createdAt)=${year} GROUP BY month ORDER BY month
    `)
    let purchases = await conn.query<TransactionMonthDB[]>(`
    SELECT MONTH(createdAt) AS month, COUNT(*) AS quantity FROM TRANSACTIONS
    WHERE operationType="${EOperationType.buy}" AND YEAR(createdAt)=${year} GROUP BY month ORDER BY month
    `)

    sales = fillMonthsInTransactions(sales)
    purchases = fillMonthsInTransactions(purchases)

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
    console.log(error)
    return NextResponse.json<ApiResponseError>({
      message: 'Ocurrió un problema',
      error
    }, { status: 500 })
  }
}
