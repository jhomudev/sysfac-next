'use client'
import React from 'react'
import { Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Input, Pagination, Selection, Spinner } from '@nextui-org/react'
import { ApiResponseWithReturn, ClientFromDB, TableHeaderColumns } from '@/types'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/libs/swr'
import formatClient from '@/adapters/formatClient'
import { useDebouncedCallback } from 'use-debounce'
import { getURLWithParams } from '@/types/utils'

const headerColumns:TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'RUC',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'DNI',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Nombres',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Apellidos',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Dirección',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Teléfono',
    sortable: false
  }
]

function TableClients () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const url = `/api/clients?${searchParams?.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<ClientFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  if (error) console.log(error)

  const clients = React.useMemo(() => data?.data?.map(client => formatClient(client)) || [], [data])

  const handleChangePage = React.useCallback((page: number) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { page }
    })
    replace(url)
  }, [searchParams, pathname, replace])

  const handleChangeRowsPerPage = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { rowsPerPage: value },
      paramsDelete: ['page']
    })
    replace(url)
  }, [searchParams, pathname, replace])

  const handleChangeSearch = useDebouncedCallback((value) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { q: value },
      paramsDelete: !value ? ['q', 'page'] : ['page']
    })
    replace(url)
  }, 600)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input
            className='w-[min(100%,400px)]'
            placeholder='Buscar cliente'
            isClearable
            defaultValue={searchParams?.get('q') ?? ''}
            startContent={<Yesicon icon={ICONS.search} />}
            onValueChange={handleChangeSearch}
          />
        </div>
        {
          data &&
            <div className='flex items-center justify-between'>
              <p><span className='font-medium text-secondary'>{data.meta?.rowsObtained}</span> resultados de un total de <span className='font-medium text-secondary'>{data.meta?.totalRows}</span> clientes </p>
              <div className='flex items-center gap-2'>
                <span>Resultados por página</span>
                <select defaultValue={data.meta?.rowsPerPage} onChange={handleChangeRowsPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
            </div>
        }
      </>
    )
  }, [data, searchParams, handleChangeRowsPerPage, handleChangeSearch])

  const bottomContent = React.useMemo(() => {
    if (!data?.meta) return
    const { page, rowsObtained, rowsPerPage } = data.meta
    const totalPages = Math.ceil(rowsObtained / rowsPerPage)

    return (
      <>
        {
          data &&
            <div className='flex gap-3 items-center justify-between'>
              <p>{selectedKeys instanceof Set ? `${selectedKeys.size} filas de 20 seleccionadas` : 'Todos las filas seleccionadas'}</p>
              <Pagination
                showControls
                total={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            </div>
        }
      </>
    )
  }, [data, selectedKeys, handleChangePage])

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Tabla de clientes'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[1000px]',
          table: 'min-h-[15rem]'
        }}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        topContent={topContent}
        bottomContent={bottomContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              className='uppercase'
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading && 'No se econtraron clientes'}
          items={clients}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ruc ?? '--'}</TableCell>
              <TableCell>{item.dni ?? '--'}</TableCell>
              <TableCell>{item.names}</TableCell>
              <TableCell>{item.lastnames}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phone}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
export default TableClients
