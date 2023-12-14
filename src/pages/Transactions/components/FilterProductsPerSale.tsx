'use client'
import { formatCategory } from '@/adapters'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, CategoryFromDB } from '@/types'
import { getURLWithParams } from '@/types/utils'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

function FiltersProductsPerSale () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<CategoryFromDB[]>>('/api/categories?rowsPerPage=1000', fetcher)
  if (error) console.log(error)
  const categories = React.useMemo(() => data?.data.map(cat => formatCategory(cat)) || [], [data])

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
    <div className='flex items-center flex-wrap gap-5'>
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
  )
}
export default FiltersProductsPerSale
