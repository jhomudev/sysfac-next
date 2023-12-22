import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, UserFromDB, UserToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (_req: NextRequest, { params }: { params: { username: string}}) => {
  try {
    const { username } = params
    const [user] = await conn.query<UserFromDB[]>(`
    SELECT userId, username, password, type, state, names, lastnames, email, phone, createdAt, updatedAt
    FROM USERS WHERE username = ?`, username)

    if (user) {
      return NextResponse.json<ApiResponseWithReturn<UserFromDB>>({
        ok: true,
        message: 'Usuario encontrado',
        data: user
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Usuario no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}

export const PUT = async (req: NextRequest, { params }: { params: { username: string}}) => {
  try {
    const { username: _username } = params
    const data: UserToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE USERS SET ? WHERE username = ?', [data, _username])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Usuario actualizado',
        data: {
          _username,
          ...data
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Usuario no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}

export const DELETE = async (_req: NextRequest, { params }: { params: { username: string}}) => {
  try {
    const { username } = params
    // validate that user has transactions
    const [res] = await conn.query<any[]>(`SELECT COUNT(transactionId) AS totalTransactions FROM TRANSACTIONS tra
    INNER JOIN USERS us ON us.userId=tra.userId
    WHERE us.username = ?`, username)
    const { totalTransactions } = res
    // TODO: validation for superadmin, dont delete this role

    if (totalTransactions > 0) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'No se puede eliminar un usuario que tenga transacciones'
      })
    }
    // delte user
    const resDB = await conn.query<OkPacket>('DELETE FROM USERS WHERE username = ?', username)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Usuario eliminado'
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Usuario no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
