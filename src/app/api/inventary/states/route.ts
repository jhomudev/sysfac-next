import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, EStateProductUnit, UnitPerStateRes } from '@/types'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const data = Object.values(EStateProductUnit).map(async state => {
      const [res] = await conn.query<any[]>(`SELECT COUNT(*) AS quantity FROM INVENTARY WHERE state='${state}'`)
      return res
    })

    const [stock, sold, damaged] = await Promise.all(data)
    if (stock && sold && damaged) {
      return NextResponse.json<ApiResponseWithReturn<UnitPerStateRes>>({
        ok: true,
        message: 'data obtenida',
        data: { stock, sold, damaged }
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
