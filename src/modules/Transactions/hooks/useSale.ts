import { formatSale } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, OperationToDB, SaleResponse, SaleToDB } from '@/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { makeSale, addOperation } from '../services'

function useSale () {
  const searchParams = useSearchParams()
  const url = `/api/sales?${searchParams?.toString()}`
  const { data, error, isLoading, mutate } = useSWR<ApiResponseWithReturn<SaleResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar ventas:', error)
  const sales = React.useMemo(() => data?.data?.map(sale => formatSale(sale)) || [], [data])

  const doSale = async (data: SaleToDB, ops: OperationToDB[]) => {
    const res = await makeSale(data, ops)
    if (!res?.ok) {
      toast.error('No se pudo hacer la venta')
      console.error(res)
    } else toast.success('Venta realizada correctamente')
    return res
  }

  const addOperations = async (ops: OperationToDB[]) => {
    const resOperations = await Promise.all(ops.map(operation => addOperation(operation)))
    if (!resOperations[0]?.ok) {
      toast.error('Ocurrió un error al agregar las operaciones')
      console.log(resOperations[0]?.message)
    }
    return resOperations[0]
  }

  return {
    dataSales: {
      data,
      error,
      isLoading,
      mutate,
      sales
    },
    doSale,
    addOperations
  }
}

export default useSale
