import { formatTransaction } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, TransactionResponse } from '@/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

function useTransaction ({ noSearchParams = false } = {}) {
  const searchParams = useSearchParams()
  const url = `/api/transactions?${!noSearchParams && searchParams.toString()}`
  const { data, error, isLoading, mutate } = useSWR<ApiResponseWithReturn<TransactionResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar transacciones:', error)
  const transactions = React.useMemo(() => data?.data?.map(tran => formatTransaction(tran)) || [], [data])

  return {
    dataTransactions: {
      data,
      error,
      isLoading,
      mutate,
      transactions
    }
  }
}

export default useTransaction
