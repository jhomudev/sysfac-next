'use client'

import { formatUser } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, EProofType, UserFromDB } from '@/types'
import { getURLWithParams } from '@/utils'
import { Autocomplete, AutocompleteItem, Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

function FilterSales () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const proofTypes = Object.entries(EProofType)
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<UserFromDB[]>>('/api/users?rowsPerPage=100', fetcher)

  if (error) console.log('Error al solicitar usuarios: ' + error)
  const users = React.useMemo(() => data?.data.map(user => formatUser(user)) || [], [data])

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
    console.log({ value })
  }

  const handleChangeUser = (value: React.Key) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { 'us.username': value },
      paramsDelete: !value ? ['us.username', 'page'] : ['page']
    })

    replace(url)
  }

  return (
    <>
      <div className='flex gap-4'>
        <Select
          name='proofType'
          aria-label='Comprobante'
          className='w-full md:max-w-xs'
          label='Comprobante'
          size='sm'
          variant='bordered'
          color='success'
          items={proofTypes}
          defaultSelectedKeys={searchParams?.get('proofType') ? [searchParams.get('proofType')!] : undefined}
          onChange={handleChangeFilter}
        >
          {
            ([_, value]) => (
              <SelectItem key={value}>{value}</SelectItem>
            )
          }
        </Select>
        <Autocomplete
          label='Usuario'
          aria-label='usuario'
          className='w-full md:max-w-xs'
          size='sm'
          variant='bordered'
          color='success'
          isLoading={isLoading}
          defaultItems={users}
          defaultSelectedKey={searchParams.get('us.username') ?? undefined}
          onSelectionChange={handleChangeUser}
        >
          {
            (user) => (
              <AutocompleteItem key={user.username}>{`${user.names} ${user.lastnames}`}</AutocompleteItem>
            )
          }
        </Autocomplete>
      </div>
    </>
  )
}
export default FilterSales
