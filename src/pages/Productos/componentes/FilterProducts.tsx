'use client'

import { formatCategory } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, CategoryFromDB, ESaleFor } from '@/types'
import { getURLWithParams } from '@/utils'
import { Autocomplete, AutocompleteItem, Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

function FilterProducts () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const saleFor = Object.entries(ESaleFor)
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<CategoryFromDB[]>>('/api/categories?rowsPerPage=1000', fetcher)

  if (error) console.log('Error al solicitar categorias: ' + error)
  const categories = React.useMemo(() => data?.data.map(cat => formatCategory(cat)) || [], [data])

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

  const handleChangeCategory = (value: React.Key) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { 'cat.slug': value },
      paramsDelete: !value ? ['cat.slug', 'page'] : ['page']
    })

    replace(url)
  }

  return (
    <>
      <div className='flex gap-4'>
        <Select
          name='prod.saleFor'
          aria-label='Venta por'
          className='w-full md:max-w-xs'
          label='Venta por'
          size='sm'
          variant='bordered'
          color='success'
          items={saleFor}
          defaultSelectedKeys={searchParams?.get('prod.saleFor') ? [searchParams.get('prod.saleFor')!] : undefined}
          onChange={handleChangeFilter}
        >
          {
            ([_, value]) => (
              <SelectItem key={value}>{value}</SelectItem>
            )
          }
        </Select>
        <Select
          name='prod.isActive'
          aria-label='Estado'
          className='w-full md:max-w-xs'
          label='Estado'
          size='sm'
          variant='bordered'
          color='success'
          defaultSelectedKeys={searchParams?.get('prod.isActive') ? [searchParams.get('prod.isActive')!] : undefined}
          onChange={handleChangeFilter}
        >
          <SelectItem key={1}>Activo</SelectItem>
          <SelectItem key={0}>Inactivo</SelectItem>
        </Select>
        <Autocomplete
          label='Categoría'
          aria-label='categoria'
          className='w-full md:max-w-xs'
          size='sm'
          variant='bordered'
          color='success'
          isLoading={isLoading}
          defaultItems={categories}
          defaultSelectedKey={!isLoading ? (searchParams?.get('cat.slug') ? searchParams.get('cat.slug')! : undefined) : undefined}
          onSelectionChange={handleChangeCategory}
        >
          {
            (cat) => (
              <AutocompleteItem key={cat.slug}>{cat.name}</AutocompleteItem>
            )
          }
        </Autocomplete>
      </div>
    </>
  )
}
export default FilterProducts
