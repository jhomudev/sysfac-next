import { formatCategory } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, CategoryFromDB, CategoryToDB } from '@/types'
import React from 'react'
// import toast from 'react-hot-toast'
import useSWR from 'swr'
import { createCategory, deleteCategory, updateCategory } from '../services'
import toast from 'react-hot-toast'

function useCategory () {
  const { data, error, isLoading, mutate } = useSWR<ApiResponseWithReturn<CategoryFromDB[]>>('/api/categories?rowsPerPage=1000', fetcher)

  const categories = React.useMemo(() => data?.data.map(cat => formatCategory(cat)) || [], [data])

  const addCategory = async (data: CategoryToDB) => {
    const res = await createCategory(data)
    if (!res?.ok) toast.error('No se pudo crear la categoría')
    else {
      toast.success('Categoría creado correctamente')
      mutate()
    }
    return res
  }

  const modifyCategory = async (slug: string, data: CategoryToDB) => {
    const res = await updateCategory(slug, data)
    if (!res?.ok) toast.error('No se pudo actualizar la categoría')
    else {
      toast.success('Categoría actualizado correctamente')
      mutate()
    }
    return res
  }

  const removeCategory = async (slug: string) => {
    const res = await deleteCategory(slug)
    if (!res?.ok) toast.error('No se pudo eliminar la categoría')
    else {
      toast.success('Categoría eliminado')
      mutate()
    }
    return res
  }

  return {
    dataCategories: {
      data,
      error,
      isLoading,
      categories
    },
    addCategory,
    modifyCategory,
    removeCategory
  }
}

export default useCategory
