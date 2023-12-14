import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, UserFromDB, UserToDB } from '@/types'
import { getQueryParams } from '@/types/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      likeColumn: 'CONCAT(names, " ", lastnames)',
      orderByColumn: 'userId',
      paramsCols: ['type', 'state'],
      URLSearchParams
    })
    const users = await conn.query<UserFromDB[]>(`SELECT userId, username, password, type, state, names, lastnames, email, phone, createdAt, updatedAt FROM USERS ${queryParamsComplete}`)
    const usersNoLimit = await conn.query<UserFromDB[]>(`SELECT userId, username, password, type, state, names, lastnames, email, phone, createdAt, updatedAt FROM USERS ${queryParamsNoLimit}`)
    const totalUsers = await conn.query<UserFromDB[]>('SELECT userId, username, password, type, state, names, lastnames, email, phone, createdAt, updatedAt FROM USERS')

    if (users) {
      return NextResponse.json<ApiResponseWithReturn<UserFromDB[]>>({
        ok: true,
        message: 'Usuarios encontrados',
        data: users,
        meta: {
          page,
          rowsPerPage,
          rowsObtained: usersNoLimit.length,
          totalRows: totalUsers.length
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
    const { username, password, type, state, names, lastnames, email, phone }: UserToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO USERS SET ?', { username, password, type, state, names, lastnames, email, phone })
    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Usuario creado',
        data: {
          insertId: resDB.insertId,
          username,
          password,
          type,
          state,
          names,
          lastnames,
          email,
          phone
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
