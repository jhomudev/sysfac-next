'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { EProofType, TableHeaderColumns } from '@/types'
import { getURLWithParams } from '@/utils'
import {
  Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Pagination, Selection,
  Spinner,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSale } from '../hooks'
import FilterSales from './FilterSales'

const headerColumns: TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Usuario'
  },
  {
    id: crypto.randomUUID(),
    name: 'Cliente'
  },

  {
    id: crypto.randomUUID(),
    name: 'Importe'
  },
  {
    id: crypto.randomUUID(),
    name: 'Descuento'
  },
  {
    id: crypto.randomUUID(),
    name: 'Total'
  },
  {
    id: crypto.randomUUID(),
    name: 'Comprobante'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function TableSales () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { dataSales: { data, isLoading, sales } } = useSale()
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

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
      newParams: { q: value, page: 1 },
      paramsDelete: !value ? ['q', 'page'] : ['page']
    })
    replace(url)
  }, 600)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input
            className='w-[min(100%,400px)] mr-auto'
            placeholder='Buscar por cliente'
            isClearable
            defaultValue={searchParams?.get('q') || ''}
            startContent={<Yesicon icon={ICONS.search} />}
            onValueChange={handleChangeSearch}
          />
          <Button as={Link} href={`${ROUTES.purchases}/new`} color={COLORS_ENT.operationType.buy.nextui} startContent={<Yesicon icon={ICONS.plus} />}>Nuevo compra</Button>
          <Button as={Link} href={`${ROUTES.sales}/new`} color={COLORS_ENT.operationType.sell.nextui} startContent={<Yesicon icon={ICONS.plus} />}>Nuevo venta</Button>
        </div>
        <FilterSales />
        {
          data &&
            <div className='flex items-center justify-between'>
              <p><span className='font-medium text-secondary'>{data.meta?.rowsObtained}</span> resultados de un total de <span className='font-medium text-secondary'>{data.meta?.totalRows}</span> ventas </p>
              <div className='flex items-center gap-2'>
                <span>Resultados por página</span>
                <select defaultValue={data.meta?.rowsPerPage} onChange={handleChangeRowsPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                </select>
              </div>
            </div>
        }
      </>
    )
  }, [data, handleChangeRowsPerPage, handleChangeSearch, searchParams])

  const bottomContent = React.useMemo(() => {
    if (!data?.meta || !(data.data.length > 0)) return
    const { page, rowsObtained, rowsPerPage } = data.meta
    const totalPages = Math.ceil(rowsObtained / rowsPerPage)

    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <p>{selectedKeys instanceof Set ? `${selectedKeys.size} filas de ${data.meta.rowsObtained} seleccionadas` : 'Todos las filas seleccionadas'}</p>
          <Pagination showControls total={totalPages} page={page} onChange={handleChangePage} />
        </div>
      </>
    )
  }, [selectedKeys, data, handleChangePage])

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Tabla de ventas'
        classNames={{
          wrapper: 'flex-1 max-h-[1000px]',
          table: 'min-h-[20rem]'
        }}
        bottomContentPlacement='outside'
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
              key={column.id}
              className='uppercase'
              align={column.align ?? 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading && 'No se encontraron ventas'}
          items={sales}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(item) => {
            const isProofTicket = item.proofType === EProofType.ticket
            return (
              <TableRow key={item.id}>
                <TableCell>{item.user.fullname}</TableCell>
                <TableCell>{item.client.fullname}</TableCell>
                <TableCell>S/{item.totalImport.toFixed(2)}</TableCell>
                <TableCell>S/{item.discount.toFixed(2)}</TableCell>
                <TableCell>S/{item.totalPay.toFixed(2)}</TableCell>
                <TableCell><Chip variant='dot' color={isProofTicket ? 'warning' : 'secondary'}>{item.proofType}</Chip></TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size='sm' variant='light'>
                        <Yesicon icon={ICONS.options} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label='actions'
                      variant='flat'
                    >
                      <DropdownItem as={NextLink} key='view' startContent={<Yesicon icon={ICONS.view} />} href={`${ROUTES.sales}/${item.id}`}>Ver detalles</DropdownItem>
                      <DropdownItem key='ticket' startContent={<Yesicon icon={ICONS.ticket} />} href={`${ROUTES.sales}/${item.id}`} target='_blank'>Ver comprobante</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
    </>
  )
}
export default TableSales
