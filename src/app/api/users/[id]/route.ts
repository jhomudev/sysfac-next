import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, UserFromDB, UserToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const [user] = await conn.query<UserFromDB[]>(`
    SELECT userId, username, password, type, state, names, lastnames, email, phone, createdAt, updatedAt
    FROM USERS WHERE userId = ?`, id)

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

export const PUT = async (req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const { username, password, names, lastnames, type, state, email, phone }: UserToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE USERS SET ? WHERE userId = ?', [{ username, password, names, lastnames, type, state, email, phone }, id])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Usuario actualizado',
        data: {
          id,
          username,
          password,
          names,
          lastnames,
          type,
          state,
          email,
          phone
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

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const resDB = await conn.query<OkPacket>('DELETE FROM USERS WHERE userId = ?', id)

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
