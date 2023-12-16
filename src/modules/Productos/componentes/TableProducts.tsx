'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Product, TableHeaderColumns, ESaleFor, EStateProduct, ApiResponseWithReturn, ProductResponse } from '@/types'
import {
  Table, TableBody, TableColumn, TableHeader, TableCell, TableRow,
  Chip, Input, Button, Pagination, Selection, Avatar, Link, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner
} from '@nextui-org/react'
import React from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getURLWithParams } from '@/utils'
import { fetcher } from '@/libs/swr'
import useSWR from 'swr'
import { useDebouncedCallback } from 'use-debounce'
import { formatProduct } from '@/adapters'
import FilterProducts from './FilterProducts'

const headerColumns: TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Imagen'
  },
  {
    id: crypto.randomUUID(),
    name: 'name'
  },
  {
    id: crypto.randomUUID(),
    name: 'Categoría'
  },
  {
    id: crypto.randomUUID(),
    name: 'Mínimo en inventario'
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio de venta',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'Unidad de venta'
  },
  {
    id: crypto.randomUUID(),
    name: 'Venta por'
  },
  {
    id: crypto.randomUUID(),
    name: 'Estado'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function TableProducts () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const url = `/api/products?${searchParams?.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<ProductResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [showModal, setShowModal] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<Product>({} as Product)

  if (error) console.log('ocurrió un error:', error)
  const products = React.useMemo(() => data?.data?.map(product => formatProduct(product)) || [], [data])

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
        <div className='flex gap-3 items-center'>
          <Input
            className='w-[min(100%,400px)] mr-auto'
            placeholder='Buscar producto'
            isClearable
            defaultValue={searchParams?.get('q') || ''}
            startContent={<Yesicon icon={ICONS.search} />}
            onValueChange={handleChangeSearch}
          />
          <Button as={Link} href={`${ROUTES.products}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo producto</Button>
          <Button as={Link} href={`${ROUTES.inventary}`} color='secondary' variant='bordered' startContent={<Yesicon icon={ICONS.products} />}>Inventario</Button>
        </div>
        <FilterProducts />
        {
          data &&
            <div className='flex items-center justify-between'>
              <p><span className='font-medium text-secondary'>{data.meta?.rowsObtained}</span> resultados de un total de <span className='font-medium text-secondary'>{data.meta?.totalRows}</span> productos </p>
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
        aria-label='Tabla de productos'
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
              className='uppercase'
              key={column.id}
              align={column.align ?? 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading && 'No se encontraron productos'}
          items={products}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(item) => {
            const isActive = item.isActive
            const saleForUnit = item.saleFor === ESaleFor.unit
            return (
              <TableRow key={item.id}>
                <TableCell><Avatar src={item.image} className='w-20 h-20 text-large' radius='md' /></TableCell>
                <TableCell><Link href={`${ROUTES.products}/${item.id}`}>{item.name}</Link></TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>{item.inventaryMin}</TableCell>
                <TableCell>{item.priceSale.toFixed(2)}</TableCell>
                <TableCell><Chip variant='flat' color={`${saleForUnit ? 'secondary' : 'warning'}`}>{item.saleFor}</Chip></TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell><Chip variant='dot' color={`${isActive ? 'success' : 'danger'}`}>{isActive ? EStateProduct.active : EStateProduct.inactive}</Chip></TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size='sm' variant='light'>
                        <Yesicon icon={ICONS.options} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label='actions'
                      variant='flat' onAction={(key) => {
                        if (key === 'delete') {
                          setProductToDelete(item)
                          setShowModal(true)
                        }
                      }}
                    >
                      <DropdownItem as={NextLink} key='view' startContent={<Yesicon icon={ICONS.view} />} href={`${ROUTES.products}/${item.id}`}>Ver producto</DropdownItem>
                      <DropdownItem as={NextLink} key='edit' startContent={<Yesicon icon={ICONS.edit} />} href={`${ROUTES.products}/${item.id}/edit`}>Editar</DropdownItem>
                      <DropdownItem key='delete' startContent={<Yesicon icon={ICONS.delete} />} color='danger' className='text-danger'>Eliminar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de eliminar el producto <b>{productToDelete?.name}</b>?</p>
                <em className='text-danger text-small'>OJO: Esta acción es irreversible.</em>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='danger' onPress={onClose}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default TableProducts
