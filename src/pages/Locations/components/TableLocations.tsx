'use client'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { Location, TableHeaderColumns, ELocationType } from '@/types'
import formatDate from '@/utils/formatDate'
import {
  Button, Chip, Input, Pagination, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
  Dropdown, DropdownMenu, DropdownTrigger, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link
} from '@nextui-org/react'
import React from 'react'
import NextLink from 'next/link'
import ROUTES from '@/app/routes'

const headerColumns: TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Nombre',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Dirección',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Tipo',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'canStore',
    sortable: true
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

type Props = {
  locations: Location[]
}

function TableLocations ({ locations }: Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [locationToDelete, setLocationToDelete] = React.useState<Location>({} as Location)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar local' startContent={<Yesicon icon={ICONS.search} />} />
          <Button as={Link} href={`${ROUTES.locations}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo local</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de locales <span className='font-medium'>12</span></p>
          <div className='flex items-center gap-2'>
            <span>Resultados por página</span>
            <select>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </div>
        </div>
      </>
    )
  }, [])

  const bottomContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <p>{selectedKeys instanceof Set ? `${selectedKeys.size} filas de 20 seleccionadas` : 'Todos las filas seleccionadas'}</p>
          <Pagination showControls total={10} initialPage={1} />
        </div>
      </>
    )
  }, [selectedKeys])

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Tabla de locals'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]'
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
        <TableBody emptyContent='No se econtraron locals' items={locations}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell><Chip variant='flat' color={item.type === ELocationType.store ? COLORS_ENT.locationType.warehouse.nextui : COLORS_ENT.locationType.store.nextui}>{item.type}</Chip></TableCell>
              <TableCell><Chip variant='dot' color={item.canStoreMore ? 'primary' : 'danger'}>{item.canStoreMore ? 'Sí' : 'No'}</Chip></TableCell>
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
                <p>¿Estás seguro de eliminar este local?</p>
                <small className='text-danger'><em>OJO: Esta acción es irreversible.</em></small>
                <p>{locationToDelete?.name}</p>
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
export default TableLocations
