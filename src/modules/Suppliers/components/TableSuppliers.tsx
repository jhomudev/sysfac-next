'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { ApiResponseWithReturn, Supplier, SupplierFromDB, TableHeaderColumns } from '@/types'
import formatDate from '@/utils/formatDate'
import NextLink from 'next/link'
import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Input, Link, Pagination, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from '@nextui-org/react'
import React from 'react'
import { fetcher } from '@/libs/swr'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { formatSupplier } from '@/adapters'
import { getURLWithParams } from '@/utils'
import { useDebouncedCallback } from 'use-debounce'

const headerColumns: TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'RUC'
  },
  {
    id: crypto.randomUUID(),
    name: 'Nombre'
  },
  {
    id: crypto.randomUUID(),
    name: 'Dirección'
  },
  {
    id: crypto.randomUUID(),
    name: 'Teléfono'
  },
  {
    id: crypto.randomUUID(),
    name: 'Fecha',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function TableSuppliers () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const url = `/api/suppliers?${searchParams?.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<SupplierFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [supplierToDelete, setSupplierToDelete] = React.useState<Supplier>({} as Supplier)

  if (error) console.log('ocurrió un error:', error)
  const suppliers = React.useMemo(() => data?.data?.map(sup => formatSupplier(sup)) || [], [data])

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
            isClearable
            className='w-[min(100%,400px)]'
            placeholder='Buscar proveedor'
            startContent={<Yesicon icon={ICONS.search} />}
            onValueChange={handleChangeSearch}
          />
          <Button as={Link} href={`${ROUTES.suppliers}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo proveedor</Button>
        </div>
        {
          data &&
            <div className='flex items-center justify-between'>
              <p><span className='font-medium text-secondary'>{data.meta?.rowsObtained}</span> resultados de un total de <span className='font-medium text-secondary'>{data.meta?.totalRows}</span> proveedores </p>
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
  }, [data, handleChangeRowsPerPage, handleChangeSearch])

  const bottomContent = React.useMemo(() => {
    if (!data?.meta) return
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
        aria-label='Tabla de proveedores'
        classNames={{
          wrapper: 'max-h-[1000px]',
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
              align={column.id === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading && 'No se econtraron proveedores'}
          items={suppliers}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.ruc}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.createdAt && formatDate(item.createdAt).dateLetter}</TableCell>
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
                        setSupplierToDelete(item)
                        setShowModal(true)
                      }
                    }}
                  >
                    <DropdownItem as={NextLink} key='edit' startContent={<Yesicon icon={ICONS.edit} />} href={`${ROUTES.suppliers}/${item.id}/edit`}>Editar</DropdownItem>
                    <DropdownItem key='delete' startContent={<Yesicon icon={ICONS.delete} />} color='danger' className='text-danger'>Eliminar</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de eliminar el proveedor <b>{supplierToDelete?.name}</b>?</p>
                <small className='text-danger'><em>OJO: Esta acción es irreversible.</em></small>
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
export default TableSuppliers
