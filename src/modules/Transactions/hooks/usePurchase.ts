import { formatPurchase } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, OperationToDB, PurchaseResponse, PurchaseToDB } from '@/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { addOperation, makePurchase } from '../services'

function usePurchase () {
  const searchParams = useSearchParams()
  const url = `/api/purchases?${searchParams?.toString()}`
  const { data, error, isLoading, mutate } = useSWR<ApiResponseWithReturn<PurchaseResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar compras:', error)
  const purchases = React.useMemo(() => data?.data?.map(p => formatPurchase(p)) || [], [data])

  const doPurchase = async (data: PurchaseToDB) => {
    const res = await makePurchase(data)
    if (!res?.ok) toast.error('No se pudo hacer la compra')
    else toast.success('Compra realizada correctamente correctamente')
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
    dataPurchases: {
      data,
      error,
      isLoading,
      mutate,
      purchases
    },
    doPurchase,
    addOperations
  }
}

export default usePurchase
