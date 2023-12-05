import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, LocationFromDB, LocationToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const [location] = await conn.query<LocationFromDB[]>(`
    SELECT localId, name, address, type, canStoreMore, createdAt, updatedAt 
    FROM LOCATIONS WHERE localId = ?`, id)

    if (location) {
      return NextResponse.json<ApiResponseWithReturn<LocationFromDB>>({
        ok: true,
        message: 'Local encontrado',
        data: location
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Local no encontrado'
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
    const { name, type, address, canStoreMore }: LocationToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE LOCATIONS SET ? WHERE localId = ?', [{ name, type, address, canStoreMore }, id])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Local actualizado',
        data: {
          id,
          name,
          type,
          address,
          canStoreMore
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Local no encontrado'
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
    const resDB = await conn.query<OkPacket>('DELETE FROM LOCATIONS WHERE localId = ?', id)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Local eliminado'
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Local no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
