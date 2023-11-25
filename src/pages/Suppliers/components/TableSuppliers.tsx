'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Supplier, TableHeaderColumns } from '@/types'
import formatDate from '@/utils/formatDate'
import NextLink from 'next/link'
import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Input, Link, Pagination, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import React from 'react'

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

type Props = {
  suppliers: Supplier[]
}

function TableSuppliers ({ suppliers }: Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [supplierToDelete, setSupplierToDelete] = React.useState<Supplier>({} as Supplier)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar proveedor' startContent={<Yesicon icon={ICONS.search} />} />
          <Button as={Link} href={`${ROUTES.suppliers}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo proveedor</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de proveedores <span className='font-medium'>12</span></p>
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
        aria-label='Tabla de usuarios'
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
        <TableBody emptyContent='No se econtraron proveedores' items={suppliers}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.ruc}</TableCell>
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
                <p>¿Estás seguro de eliminar este proveedor?</p>
                <small className='text-danger'><em>OJO: Esta acción es irreversible.</em></small>
                <p>{supplierToDelete?.name}</p>
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
