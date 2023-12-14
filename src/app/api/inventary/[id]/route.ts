import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'
import { ApiResponse, ApiResponseError, UnitInventaryToDB } from '@/types'
import { conn } from '@/libs/mysql'
export const PUT = async (req: NextRequest, { params }: {params: {id: `${number}` | number}}) => {
  try {
    // can only modify state and local
    const { id } = params
    const { state, localId } = await req.json() as UnitInventaryToDB
    const resDB = await conn.query<OkPacket>('UPDATE INVENTARY SET ? WHERE unitId = ?', [{ state, localId }, id])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Unidad actualizada',
        data: { id: resDB.insertId, state, localId }
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
