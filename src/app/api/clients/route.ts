import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, ClientFromDB, ClientToDB } from '@/types'
import { getQueryParams } from '@/types/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      likeColumn: 'CONCAT(names, " ", lastnames)',
      orderByColumn: 'clientId',
      paramsCols: [],
      URLSearchParams
    })
    const clients = await conn.query<ClientFromDB[]>(`SELECT clientId, ruc, dni, names, lastnames, address, phone, createdAt, updatedAt FROM CLIENTS ${queryParamsComplete}`)
    const clientsNoLimit = await conn.query<ClientFromDB[]>(`SELECT clientId, ruc, dni, names, lastnames, address, phone, createdAt, updatedAt FROM CLIENTS ${queryParamsNoLimit}`)
    const totalClients = await conn.query<ClientFromDB[]>('SELECT clientId, ruc, dni, names, lastnames, address, phone, createdAt, updatedAt FROM CLIENTS')

    if (clients) {
      return NextResponse.json<ApiResponseWithReturn<ClientFromDB[]>>({
        ok: true,
        message: 'Clientes encontrados',
        data: clients,
        meta: {
          rowsObtained: clientsNoLimit.length,
          totalRows: totalClients.length,
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
    const { ruc, dni, names, lastnames, address, phone }: ClientToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO CLIENTS SET ?', { ruc, dni, names, lastnames, address, phone })
    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Cliente creado',
        data: {
          insertId: resDB.insertId,
          ruc,
          dni,
          names,
          lastnames,
          address,
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
