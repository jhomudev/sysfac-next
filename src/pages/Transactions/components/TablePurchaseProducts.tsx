'use client'
import React from 'react'
import {
  Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
  Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent
} from '@nextui-org/react'
import { TableHeaderColumns } from '@/types'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'

export type TablePurchaseProductsItem={
  product: string,
  serialnumber: string,
  cost: number,
  priceSale: number,
  quantity: number,
  total: number
}

type Props ={
  dataProducts: TablePurchaseProductsItem[]
}

const headerColumns:TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Producto',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'NS',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'Costo',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio de venta',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'Cantidad',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'Total',
    align: 'end'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones',
    align: 'end'
  }
]

function TablePurchaseProducts ({ dataProducts }:Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const topContent = React.useMemo(() => {
    const handleClick = () => {
      setShowModal(true)
    }
    return (
      <>
        <h2 className='title'>Productos en carrito de compras</h2>
        <Button
          onPress={handleClick}
          variant='bordered'
          color='secondary'
          className='w-min'
        >
          <Yesicon icon={ICONS.clean} />Limpiar carrito
        </Button>
      </>
    )
  }, [])

  return (
    <>
      <Table
        isHeaderSticky
        // removeWrapper
        aria-label='Tabla de productos para compra'
        topContent={topContent}
        topContentPlacement='outside'
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.id}
              className='uppercase'
              align={column.align ?? 'end'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent='No hay productos en el carrito de compras' items={dataProducts}>
          {(item) => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.priceSale}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.serialnumber}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.total}</TableCell>
              <TableCell><Tooltip content='Eliminar' color='danger'><span className='block w-min text-danger cursor-pointer'><Yesicon fontSize={20} icon={ICONS.delete} /></span></Tooltip></TableCell>
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
                <p>¿Está seguro de limpíar carrito de compra?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button variant='ghost' color='warning' onPress={onClose}>
                  Limpiar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default TablePurchaseProducts
