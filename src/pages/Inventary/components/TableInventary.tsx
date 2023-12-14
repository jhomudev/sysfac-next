'use client'
import { formatUnitInventary } from '@/adapters'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, EStateProductUnit, TableHeaderColumns, UnitInventary, UnitInventaryResponse } from '@/types'
import { getURLWithParams } from '@/types/utils'
import {
  Button, Chip,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Input,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Pagination, Selection, Spinner,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import { useDebouncedCallback } from 'use-debounce'
import FilterInventary from './FilterInventary'

const headerColumns: TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Producto'
  },
  {
    id: crypto.randomUUID(),
    name: 'Numero de serie'
  },
  {
    id: crypto.randomUUID(),
    name: 'Estado'
  },
  {
    id: crypto.randomUUID(),
    name: 'Local'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function TableInventary () {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const url = `/api/inventary?${searchParams?.toString()}`
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<UnitInventaryResponse[]>>(url, fetcher, {
    keepPreviousData: true
  })
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [unitToDelete, setUnitToDelete] = React.useState<UnitInventary>({} as UnitInventary)

  if (error) console.log('ocurrió un error:', error)
  const inventary = React.useMemo(() => data?.data?.map(unit => formatUnitInventary(unit)) || [], [data])

  const [showModal, setShowModal] = React.useState<boolean>(false)

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
            placeholder='Buscar por número de serie'
            startContent={<Yesicon icon={ICONS.search} />}
            defaultValue={searchParams?.get('q') || ''}
            onValueChange={handleChangeSearch}
          />
          {/* <Button as={Link} href={`${ROUTES.inventary}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo local</Button> */}
        </div>
        <FilterInventary />
        {
          data &&
            <div className='flex items-center justify-between'>
              <p><span className='font-medium text-secondary'>{data.meta?.rowsObtained}</span> resultados de un total de <span className='font-medium text-secondary'>{data.meta?.totalRows}</span> unidades </p>
              <div className='flex items-center gap-2'>
                <span>Resultados por página</span>
                <select defaultValue={data.meta?.rowsPerPage} onChange={handleChangeRowsPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
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
        aria-label='Tabla de inventario'
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
          emptyContent={!isLoading && 'No se econtraron unidades'}
          items={inventary}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell>
                <Chip
                  variant='flat'
                  color={item.state === EStateProductUnit.stock ? COLORS_ENT.stateProductUnit.stock.nextui : item.state === EStateProductUnit.damaged ? COLORS_ENT.stateProductUnit.damaged.nextui : COLORS_ENT.stateProductUnit.sold.nextui}
                >{item.state}
                </Chip>
              </TableCell>
              <TableCell>{item.location.name}</TableCell>
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
                        setUnitToDelete(item)
                        setShowModal(true)
                      }
                    }}
                  >
                    {/* <DropdownItem as={NextLink} key='edit' startContent={<Yesicon icon={ICONS.edit} />} href={`${ROUTES.inventary}/${item.id}/edit`}>Editar</DropdownItem> */}
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
                <p>¿Estás seguro de eliminar <b>{unitToDelete?.product.name} N.S.{unitToDelete.serialNumber}</b>?</p>
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
export default TableInventary
