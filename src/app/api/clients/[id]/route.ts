import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, ClientFromDB, ClientToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const [client] = await conn.query<ClientFromDB[]>(`
    SELECT clientId, ruc, dni, names, lastnames, address, phone, createdAt, updatedAt
    FROM CLIENTS WHERE clientId = ?`, id)

    if (client) {
      return NextResponse.json<ApiResponseWithReturn<ClientFromDB>>({
        ok: true,
        message: 'Cliente encontrado',
        data: client
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Cliente no encontrado'
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
    const { dni, ruc, names, lastnames, address, phone }: ClientToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE CLIENTS SET ? WHERE clientId = ?', [{ dni, ruc, names, lastnames, address, phone }, id])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Cliente actualizado',
        data: {
          id,
          dni,
          ruc,
          names,
          lastnames,
          address,
          phone
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Cliente no encontrado'
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
    const resDB = await conn.query<OkPacket>('DELETE FROM CLIENTS WHERE clientId = ?', id)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Cliente eliminado'
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Cliente no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
