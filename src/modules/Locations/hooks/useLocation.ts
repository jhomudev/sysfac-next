import React from 'react'
import { ApiResponseWithReturn, LocationFromDB, LocationToDB } from '@/types'
import { createLocation, deleteLocation, updateLocation } from '../services'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/libs/swr'
import { formatLocation } from '@/adapters'

function useLocation () {
  const searchParams = useSearchParams()
  const url = `/api/locations?${searchParams.toString()}`
  const { data, error, isLoading, mutate } = useSWR<ApiResponseWithReturn<LocationFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar locales:', error)
  const locations = React.useMemo(() => data?.data?.map(local => formatLocation(local)) || [], [data])

  const addLocation = async (data: LocationToDB) => {
    const res = await createLocation(data)
    if (!res?.ok) toast.error('No se pudo crear el local')
    else toast.success('Local creado correctamente')
    return res
  }

  const modifyLocation = async (localId: number, data: LocationToDB) => {
    const res = await updateLocation(localId, data)
    if (!res?.ok) toast.error('No se pudo actualizar el local')
    else toast.success('Local actualizado correctamente')
    return res
  }

  const removeLocation = async (localId: number) => {
    const res = await deleteLocation(localId)
    if (!res?.ok) toast.error('No se pudo eliminar el local')
    else toast.success('Local eliminado')
    return res
  }

  return {
    dataLocations: {
      data,
      error,
      isLoading,
      mutate,
      locations
    },
    addLocation,
    modifyLocation,
    removeLocation
  }
}

export default useLocation
