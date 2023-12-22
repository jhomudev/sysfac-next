import { ApiResponseWithReturn, UserFromDB, UserToDB } from '@/types'
import { createUser, deleteUser, updateUser } from '../services'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/libs/swr'
import { formatUser } from '@/adapters'
import React from 'react'

function useUser () {
  const searchParams = useSearchParams()
  const url = `/api/users?${searchParams.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<UserFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('Error al solicitar usuarios:', error)
  const users = React.useMemo(() => data?.data?.map(user => formatUser(user)) || [], [data])

  const addUser = async (data: UserToDB) => {
    const res = await createUser(data)
    if (!res?.ok) toast.error('No se pudo crear el usuario')
    else toast.success('Usuario creado correctamente')
    return res
  }

  const modifyUser = async (username: string, data: Partial<UserToDB>) => {
    const res = await updateUser(username, data)
    if (!res?.ok) toast.error('No se pudo actualizar el usuario')
    else toast.success('Usuario actualizado correctamente')
    return res
  }

  const removeUser = async (username: string) => {
    const res = await deleteUser(username)
    if (!res?.ok) toast.error('No se pudo eliminar el usuario')
    else toast.success('Usuario eliminado')
    return res
  }

  return {
    dataUsers: {
      data,
      error,
      isLoading,
      users
    },
    addUser,
    modifyUser,
    removeUser
  }
}

export default useUser
