import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, ProductResponse, ProductToDB } from '@/types'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { createProduct, deleteProduct, updateProduct } from '../services'
import React from 'react'
import { formatProduct } from '@/adapters'

function useProduct () {
  const searchParams = useSearchParams()
  const url = `/api/products?${searchParams?.toString()}`
  const dataProducts = useSWR<ApiResponseWithReturn<ProductResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })

  const products = React.useMemo(() => dataProducts.data?.data?.map(product => formatProduct(product)) || [], [dataProducts.data])

  const addProduct = async (data: ProductToDB) => {
    const res = await createProduct(data)
    if (!res?.ok) toast.error('No se pudo crear el producto')
    else toast.success('Producto creado correctamente')
    return res
  }

  const modifyProduct = async (productId: number, data: ProductToDB) => {
    const res = await updateProduct(productId, data)
    if (!res?.ok) toast.error('No se pudo actualizar el producto')
    else toast.success('Producto actualizado correctamente')
    return res
  }

  const removeProduct = async (productId: number) => {
    const res = await deleteProduct(productId)
    if (!res?.ok) toast.error('No se pudo eliminar el producto')
    else toast.success('Producto eliminado')
    return res
  }

  return {
    dataProducts: {
      ...dataProducts,
      products
    },
    addProduct,
    modifyProduct,
    removeProduct
  }
}

export default useProduct
