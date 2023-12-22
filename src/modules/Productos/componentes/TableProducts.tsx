'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { ESaleFor, EStateProduct, Product, TableHeaderColumns } from '@/types'
import { getURLWithParams } from '@/utils'
import {
  Avatar, Button, Chip, Input, Link,
  Pagination, Selection, Spinner,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useProduct } from '../hooks'
import FilterProducts from './FilterProducts'
import toast from 'react-hot-toast'

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
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [showModal, setShowModal] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<Product>({} as Product)
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false)

  const { dataProducts: { data, isLoading, products, mutate }, removeProduct } = useProduct()

  const handleConfirmDelete = async () => {
    setIsLoadingDelete(true)
    const res = await removeProduct(productToDelete.id)
    setIsLoadingDelete(false)
    if (!res?.ok) {
      toast.error(res?.message || 'No permitido')
      return
    }
    setShowModal(false)
    mutate()
  }

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
          wrapper: 'flex-1 max-h-[2000px]',
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
                <Button isLoading={isLoadingDelete} color='danger' onPress={handleConfirmDelete}>
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
