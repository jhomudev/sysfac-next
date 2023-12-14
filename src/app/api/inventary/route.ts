import { formatUnitInventaryResponse } from '@/adapters'
import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, UnitInventaryFromDB, UnitInventaryResponse, UnitInventaryToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      URLSearchParams: searchParams,
      likeColumn: 'inv.serialNumber',
      orderByColumn: 'prod.productId',
      paramsCols: ['inv.productId', 'inv.state', 'inv.localId']
    })

    const inventary = await conn.query<UnitInventaryFromDB[]>(`
    SELECT inv.unitId, inv.serialNumber, inv.state, inv.createdAt, inv.updatedAt, inv.productId, inv.localId,
    prod.name as productName,
    loc.name as locationName
    FROM INVENTARY inv
    INNER JOIN PRODUCTS prod ON prod.productId=inv.productId
    INNER JOIN LOCATIONS loc ON loc.localId=inv.localId
    ${queryParamsComplete}
    `)

    const inventaryNoLimit = await conn.query<UnitInventaryFromDB[]>(`
    SELECT inv.unitId, inv.serialNumber, inv.state, inv.createdAt, inv.updatedAt, inv.productId, inv.localId,
    prod.name as productName,
    loc.name as locationName
    FROM INVENTARY inv 
    INNER JOIN PRODUCTS prod ON prod.productId=inv.productId
    INNER JOIN LOCATIONS loc ON loc.localId=inv.localId
    ${queryParamsNoLimit}
    `)

    const totalInventary = await conn.query<any[]>('SELECT unitId FROM INVENTARY')

    if (inventary) {
      const inventaryFormated = inventary.map(unit => formatUnitInventaryResponse(unit))
      return NextResponse.json<ApiResponseWithReturn<UnitInventaryResponse[]>>({
        ok: true,
        message: 'Unidades de inventario obtenidas',
        data: inventaryFormated,
        meta: {
          rowsObtained: inventaryNoLimit.length,
          totalRows: totalInventary.length,
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
      message: 'Ocurrió un problema',
      error
    }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { serialNumber, productId, localId } = await req.json() as UnitInventaryToDB
    const resDB = await conn.query<OkPacket>('INSERT INTO INVENTARY SET ?', { serialNumber, productId, localId })

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Unidad agregada al inventario',
        data: { id: resDB.insertId, serialNumber, productId, localId }
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
