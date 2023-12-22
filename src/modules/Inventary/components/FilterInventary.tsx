'use client'

import { formatLocation, formatProduct } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, EStateProductUnit, LocationFromDB, ProductResponse } from '@/types'
import { getURLWithParams } from '@/utils'
import { Autocomplete, AutocompleteItem, Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

function FilterInventary () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const states = Object.entries(EStateProductUnit)
  const resProducts = useSWR<ApiResponseWithReturn<ProductResponse[]>>('/api/products?rowsPerPage=1000', fetcher)
  const resLocations = useSWR<ApiResponseWithReturn<LocationFromDB[]>>('/api/locations?rowsPerPage=1000', fetcher)

  if (resProducts.error) console.log('Error al solicitar productos: ' + resProducts.error)
  const products = React.useMemo(() => resProducts.data?.data.map(prod => formatProduct(prod)) || [], [resProducts.data])
  const locations = React.useMemo(() => resLocations.data?.data.map(local => formatLocation(local)) || [], [resLocations.data])

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const param = e.target.name
    const value = e.target.value

    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { [param]: value },
      paramsDelete: !value ? [param, 'page'] : ['page']
    })

    replace(url)
  }

  const handleChangeProduct = (value: React.Key) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { 'inv.productId': value },
      paramsDelete: !value ? ['inv.productId', 'page'] : ['page']
    })

    replace(url)
  }

  const handleChangeLocal = (value: React.Key) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { 'inv.localId': value },
      paramsDelete: !value ? ['inv.localId', 'page'] : ['page']
    })

    replace(url)
  }

  return (
    <>
      <div className='flex gap-4'>
        <Select
          name='inv.state'
          aria-label='Estado'
          className='w-full md:max-w-xs'
          label='Estado'
          size='sm'
          variant='bordered'
          color='success'
          items={states}
          defaultSelectedKeys={searchParams?.get('inv.state') ? [searchParams.get('inv.state')!] : undefined}
          onChange={handleChangeFilter}
        >
          {
            ([_, value]) => (
              <SelectItem key={value}>{value}</SelectItem>
            )
          }
        </Select>
        <Autocomplete
          label='Producto'
          aria-label='producto'
          className='w-full md:max-w-xs'
          size='sm'
          variant='bordered'
          color='success'
          isLoading={resProducts.isLoading}
          defaultItems={products}
          defaultSelectedKey={searchParams.get('inv.productId') ?? undefined}
          onSelectionChange={handleChangeProduct}
        >
          {
            (prod) => (
              <AutocompleteItem key={prod.id}>{prod.name}</AutocompleteItem>
            )
          }
        </Autocomplete>
        <Autocomplete
          label='Local'
          aria-label='local'
          className='w-full md:max-w-xs'
          size='sm'
          variant='bordered'
          color='success'
          isLoading={resLocations.isLoading}
          defaultItems={locations}
          defaultSelectedKey={searchParams.get('inv.localId') ?? undefined}
          onSelectionChange={handleChangeLocal}
        >
          {
            (local) => (
              <AutocompleteItem key={local.id}>{local.name}</AutocompleteItem>
            )
          }
        </Autocomplete>
      </div>
    </>
  )
}
export default FilterInventary
