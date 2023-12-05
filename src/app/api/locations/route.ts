import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, LocationFromDB, LocationToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit } = getQueryParams({
      likeColumn: 'name',
      orderByColumn: 'localId',
      paramsCols: ['type', 'canStoreMore'],
      URLSearchParams
    })
    const locations = await conn.query<LocationFromDB[]>(`SELECT localId, name, address, type, canStoreMore, createdAt, updatedAt FROM LOCATIONS ${queryParamsComplete}`)
    const locationsNoLimit = await conn.query<LocationFromDB[]>(`SELECT localId, name, address, type, canStoreMore, createdAt, updatedAt FROM LOCATIONS ${queryParamsNoLimit}`)
    const totalLocals = await conn.query<LocationFromDB[]>('SELECT localId, name, address, type, canStoreMore, createdAt, updatedAt FROM LOCATIONS')

    if (locations) {
      return NextResponse.json<ApiResponseWithReturn<LocationFromDB[]>>({
        ok: true,
        message: 'Locales encontrados',
        data: locations,
        meta: {
          rowsObtained: locationsNoLimit.length,
          totalRows: totalLocals.length
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
    const { name, type, address, canStoreMore }: LocationToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO LOCATIONS SET ?', { name, type, address, canStoreMore })
    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Local agregado',
        data: {
          insertId: resDB.insertId,
          name,
          type,
          address,
          canStoreMore
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
