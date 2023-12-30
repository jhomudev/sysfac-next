import { formatClient } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, ClientFromDB, ClientToDB } from '@/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { createClient } from '../services'

function useClient () {
  const searchParams = useSearchParams()
  const url = `/api/clients?${searchParams?.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<ClientFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar clientes', error)
  const clients = React.useMemo(() => data?.data?.map(client => formatClient(client)) || [], [data])

  const addClient = async (data: ClientToDB) => {
    const res = await createClient(data)
    if (!res?.ok) toast.error('No se pudo agregar el cliente')
    else toast.success('Cliente agregado correctamente')
    return res
  }

  return {
    dataProducts: {
      data,
      isLoading,
      error,
      clients
    },
    addClient
  }
}

export default useClient
