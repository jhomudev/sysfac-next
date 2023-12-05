'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Product, TableHeaderColumns, ESaleFor, EStateProduct } from '@/types'
import {
  Table, TableBody, TableColumn, TableHeader, TableCell, TableRow,
  Chip, Input, Button, Pagination, Selection, Avatar, Link, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader
} from '@nextui-org/react'
import React from 'react'
import NextLink from 'next/link'

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
    name: 'Categoría',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Mínimo en inventario'
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio de venta',
    align: 'end',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Unidad de venta',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Venta por',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Estado',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

type Props = {
  products: Product[]
}

function TableProducts ({ products }:Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [showModal, setShowModal] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<Product>({} as Product)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar producto' startContent={<Yesicon icon={ICONS.search} />} />
          <Button as={Link} href={`${ROUTES.products}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo producto</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de produtos <span className='font-medium'>12</span></p>
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
        aria-label='Tabla de productos'
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
        <TableBody emptyContent='No se econtraron productos' items={products}>
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
                <p>¿Estás seguro de eliminar este producto?</p>
                <small className='text-danger'><em>OJO: Esta acción es irreversible.</em></small>
                <p>{productToDelete?.name}</p>
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
