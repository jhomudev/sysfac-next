'use client'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { ApiResponseWithReturn, Product, ProductResponse } from '@/types'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React from 'react'

import { formatProduct } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import FormSaleAddProduct from './FormSaleAddProduct'
import ListProductsPerSaleSkeleton from './ListProductsPerSaleSkeleton'

function ListProductsPerSale () {
  const searchParams = useSearchParams()
  const url = `/api/products?prod.isActive=1&rowsPerPage=1000&${searchParams?.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<ProductResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })
  const [productToAdd, setProductToAdd] = React.useState<Product>({} as Product)
  const [showForm, setShowForm] = React.useState<boolean>(false)

  if (error) console.log('Error al solicitar productos', error)
  const products = React.useMemo(() => data?.data?.map(product => formatProduct(product)) || [], [data])
  const hasproducts = products.length > 0

  if (!isLoading && !hasproducts) return <div className='flex-1 grid place-items-center'><p className='text-center text'>No se econtraron productos</p></div>

  return (
    <>
      {/* <motion.ul className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]'> */}
      <motion.ul className='grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {
          isLoading
            ? <ListProductsPerSaleSkeleton />
            : products.map(product => (
              <Card key={product.id} as={motion.li} fullWidth className='flex-1'/* max-w-[300px]' */>
                <CardHeader className='flex flex-col items-center'>
                  <strong className='text-sm text-primary text-center line-clamp-2'>{product.name}</strong>
                  <small className='text-mySoftDark text-xs'>4 disponibles</small>
                </CardHeader>
                <CardBody>
                  <Image classNames={{ wrapper: 'mx-7' }} src='https://cdn-icons-png.flaticon.com/512/10810/10810368.png' alt='empty box' />
                </CardBody>
                <CardFooter className='flex justify-between'>
                  <div className='text-tiny'>
                    <p>Precio: </p>
                    <span className='text-lg font-semibold text-secondary font-sans'>S/{product.priceSale.toFixed(2)}</span>
                  </div>
                  <Button
                    isIconOnly
                    radius='lg'
                    color='success'
                    onPress={() => {
                      setProductToAdd(product)
                      setShowForm(true)
                    }}
                  ><Yesicon fontSize={20} icon={ICONS.cart} />
                  </Button>
                </CardFooter>
              </Card>
            ))
        }
      </motion.ul>
      <FormSaleAddProduct product={productToAdd} isOpen={showForm} onOpenChange={setShowForm} />
    </>
  )
}
export default ListProductsPerSale
