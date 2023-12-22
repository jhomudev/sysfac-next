'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { ELocationType, Location, TableHeaderColumns } from '@/types'
import { getURLWithParams } from '@/utils'
import formatDate from '@/utils/formatDate'
import {
  Button, Chip,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Input, Link,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Pagination, Selection, Spinner,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { useLocation } from '../hooks'
import FilterLocations from './FilterLocations'

const headerColumns: TableHeaderColumns[] = [
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
    name: 'Tipo'
  },
  {
    id: crypto.randomUUID(),
    name: 'Estado'
  },
  {
    id: crypto.randomUUID(),
    name: 'Fecha de adición'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function TableLocations () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { dataLocations: { data, isLoading, locations, mutate }, removeLocation } = useLocation()
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [locationToDelete, setLocationToDelete] = React.useState<Location>({} as Location)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false)

  const handleConfirmDelete = async () => {
    setIsLoadingDelete(true)
    const res = await removeLocation(locationToDelete.id)
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
            placeholder='Buscar local'
            startContent={<Yesicon icon={ICONS.search} />}
            defaultValue={searchParams?.get('q') || ''}
            onValueChange={handleChangeSearch}
          />
          <Button as={Link} href={`${ROUTES.locations}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo local</Button>
        </div>
        <FilterLocations />
        {
          data &&
            <div className='flex items-center justify-between'>
              <p><span className='font-medium text-secondary'>{data.meta?.rowsObtained}</span> resultados de un total de <span className='font-medium text-secondary'>{data.meta?.totalRows}</span> locales </p>
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
  }, [data, handleChangeSearch, handleChangeRowsPerPage, searchParams])

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
        aria-label='Tabla de locales'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'flex-1 max-h-[1000px]',
          table: 'min-h-[20rem]'
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
          emptyContent={!isLoading && 'No se econtraron locales'}
          items={locations}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell><Chip variant='flat' color={item.type === ELocationType.store ? COLORS_ENT.locationType.warehouse.nextui : COLORS_ENT.locationType.store.nextui}>{item.type}</Chip></TableCell>
              <TableCell><Chip variant='dot' color={item.canStoreMore ? 'primary' : 'danger'}>{item.canStoreMore ? 'Puede almacenar' : 'Lleno'}</Chip></TableCell>
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
                        setLocationToDelete(item)
                        setShowModal(true)
                      }
                    }}
                  >
                    <DropdownItem as={NextLink} key='edit' startContent={<Yesicon icon={ICONS.edit} />} href={`${ROUTES.locations}/${item.id}/edit`}>Editar</DropdownItem>
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
                <p>¿Estás seguro de eliminar <b>{locationToDelete?.name}</b>?</p>
                <small className='text-danger'><em>OJO: Esta acción es irreversible.</em></small>
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
export default TableLocations
