import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, SupplierFromDB, SupplierToDB } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (_req: NextRequest, { params }: { params: { id: string}}) => {
  try {
    const { id } = params
    const [supplier] = await conn.query<SupplierFromDB[]>(`
    SELECT supplierId, ruc, name, address, phone, createdAt, updatedAt 
    FROM SUPPLIERS WHERE supplierId = ?`, id)

    if (supplier) {
      return NextResponse.json<ApiResponseWithReturn<SupplierFromDB>>({
        ok: true,
        message: 'Proveedor encontrado',
        data: supplier
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Proveedor no encontrado'
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
    const { name, address, ruc, phone }: SupplierToDB = await req.json()
    const resDB = await conn.query<OkPacket>('UPDATE SUPPLIERS SET ? WHERE supplierId = ?', [{ name, address, ruc, phone }, id])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Proveedor actualizado',
        data: {
          id,
          name,
          address,
          ruc,
          phone
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Proveedor no encontrado'
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

    // validate that supllier has transactions
    const [res] = await conn.query<any[]>(`SELECT COUNT(transactionId) AS totalTransactions FROM TRANSACTIONS tra
    INNER JOIN SUPPLIERS sup ON sup.supplierId=tra.supplierId
    WHERE tra.supplierId = ?`, id)
    const { totalTransactions } = res

    if (totalTransactions > 0) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'No se puede eliminar un proveedor partícipe'
      })
    }

    // delete supplier
    const resDB = await conn.query<OkPacket>('DELETE FROM SUPPLIERS WHERE supplierId = ?', id)

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Proveedor eliminado'
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Proveedor no encontrado'
    }, { status: 404 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}
