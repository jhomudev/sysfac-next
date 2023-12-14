import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, SupplierFromDB, SupplierToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit, page, rowsPerPage } = getQueryParams({
      likeColumn: 'name',
      orderByColumn: 'supplierId',
      paramsCols: [],
      URLSearchParams
    })
    const suppliers = await conn.query<SupplierFromDB[]>(`SELECT supplierId, ruc, name, address, phone, createdAt, updatedAt FROM SUPPLIERS ${queryParamsComplete}`)
    const suppliersNoLimit = await conn.query<SupplierFromDB[]>(`SELECT supplierId, ruc, name, address, phone, createdAt, updatedAt FROM SUPPLIERS ${queryParamsNoLimit}`)
    const totalSuppliers = await conn.query<SupplierFromDB[]>('SELECT supplierId, ruc, name, address, phone, createdAt, updatedAt FROM SUPPLIERS')

    if (suppliers) {
      return NextResponse.json<ApiResponseWithReturn<SupplierFromDB[]>>({
        ok: true,
        message: 'Proveedores encontradas',
        data: suppliers,
        meta: {
          rowsObtained: suppliersNoLimit.length,
          totalRows: totalSuppliers.length,
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
    const { ruc, name, address, phone }: SupplierToDB = await req.json()
    const resDB = await conn.query<OkPacket>('INSERT INTO SUPPLIERS SET ?', { ruc, name, address, phone })
    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Proveedor agregado',
        data: {
          insertId: resDB.insertId,
          ruc,
          name,
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
