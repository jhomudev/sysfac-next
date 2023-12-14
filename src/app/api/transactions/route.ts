import { formatTransactionResponse } from '@/adapters'
import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, TransactionFromDB, TransactionResponse } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      likeColumn: 'CONCAT(us.names," ", cli.lastnames)',
      orderByColumn: 'transactionId',
      paramsCols: ['tran.operationtype', 'tran.proofType'],
      URLSearchParams
    })
    const transactions = await conn.query<TransactionFromDB[]>(`
    SELECT tran.transactionId, tran.operationType, tran.totalPay, tran.comments, tran.createdAt,
    us.userId, us.username, CONCAT(us.names," ", us.lastnames) as userFullname
    FROM TRANSACTIONS tran
    INNER JOIN USERS us ON us.userId = tran.userId
    ${queryParamsComplete}`)
    const transactionsNoLimit = await conn.query<TransactionFromDB[]>(`SELECT transactionId FROM TRANSACTIONS ${queryParamsNoLimit}`)
    const totalTransactions = await conn.query<TransactionFromDB[]>('SELECT transactionId FROM TRANSACTIONS')

    if (transactions) {
      const transactionsFormated = transactions.map(tran => formatTransactionResponse(tran))
      return NextResponse.json<ApiResponseWithReturn<TransactionResponse[]>>({
        ok: true,
        message: 'Transacciones encontradas',
        data: transactionsFormated,
        meta: {
          rowsObtained: transactionsNoLimit.length,
          totalRows: totalTransactions.length,
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

// export const POST = async (req: NextRequest) => {
//   try {
//     const data: TransactionToDB = await req.json()
//     const resDB = await conn.query<OkPacket>('INSERT INTO TRANSACTIONS SET ?', data)
//     if (resDB.affectedRows > 0) {
//       return NextResponse.json<ApiResponse>({
//         ok: true,
//         message: 'Transacción realizada',
//         data: {
//           insertId: resDB.insertId,
//           ...data
//         }
//       })
//     }
//     return NextResponse.json<ApiResponse>({
//       ok: false,
//       message: 'Error en la consulta'
//     }, { status: 400 })
//   } catch (error) {
//     return NextResponse.json<ApiResponseError>({
//       error,
//       message: 'Ocurrió un error'
//     }, { status: 500 })
//   }
// }
