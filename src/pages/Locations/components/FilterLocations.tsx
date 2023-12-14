'use client'
import { ELocationType } from '@/types'
import { getURLWithParams } from '@/utils'
import { Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function FilterLocations () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locationTypes = Object.entries(ELocationType)

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

  return (
    <div className='flex gap-4'>
      <Select
        name='type'
        aria-label='Venta por'
        className='w-full md:max-w-xs'
        label='Tipo'
        size='sm'
        variant='bordered'
        color='success'
        items={locationTypes}
        defaultSelectedKeys={searchParams?.get('type') ? [searchParams.get('type')!] : undefined}
        onChange={handleChangeFilter}
      >
        {
          ([_, value]) => (
            <SelectItem key={value}>{value}</SelectItem>
          )
          }
      </Select>
      <Select
        name='canStoreMore'
        aria-label='Estado'
        className='w-full md:max-w-xs'
        label='Estado'
        size='sm'
        variant='bordered'
        color='success'
        defaultSelectedKeys={searchParams?.get('canStoreMore') ? [searchParams.get('canStoreMore')!] : undefined}
        onChange={handleChangeFilter}
      >
        <SelectItem key={1}>Puede almacenar</SelectItem>
        <SelectItem key={0}>Lleno</SelectItem>
      </Select>
    </div>
  )
}
export default FilterLocations
