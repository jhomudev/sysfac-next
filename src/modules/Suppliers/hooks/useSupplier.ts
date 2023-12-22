import React from 'react'
import { ApiResponseWithReturn, SupplierFromDB, SupplierToDB } from '@/types'
import { createSupplier, deleteSupplier, updateSupplier } from '../services'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/libs/swr'
import { formatSupplier } from '@/adapters'

function useSupplier () {
  const searchParams = useSearchParams()
  const url = `/api/suppliers?${searchParams.toString()}`
  const { data, error, isLoading, mutate } = useSWR<ApiResponseWithReturn<SupplierFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar proveedores:', error)
  const suppliers = React.useMemo(() => data?.data?.map(supplier => formatSupplier(supplier)) || [], [data])

  const addSupplier = async (data: SupplierToDB) => {
    const res = await createSupplier(data)
    if (!res?.ok) toast.error('No se pudo crear el proveedor')
    else toast.success('Usuario creado correctamente')
    return res
  }

  const modifySupplier = async (supplierId: number, data: SupplierToDB) => {
    const res = await updateSupplier(supplierId, data)
    if (!res?.ok) toast.error('No se pudo actualizar el proveedor')
    else toast.success('Usuario actualizado correctamente')
    return res
  }

  const removeSupplier = async (supplierId: number) => {
    const res = await deleteSupplier(supplierId)
    if (!res?.ok) toast.error('No se pudo eliminar el proveedor')
    else toast.success('Usuario eliminado')
    return res
  }

  return {
    dataSuppliers: {
      data,
      error,
      isLoading,
      mutate,
      suppliers
    },
    addSupplier,
    modifySupplier,
    removeSupplier
  }
}

export default useSupplier
