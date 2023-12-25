'use client'
import React from 'react'
import {
  Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
  Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent
} from '@nextui-org/react'
import { TableHeaderColumns } from '@/types'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { useCartPurchase } from '@/hooks'
import { toast } from 'react-hot-toast'

export type TablePurchaseProductsItem={
  product: string,
  serialnumber: string,
  cost: number,
  priceSale: number,
  quantity: number,
  total: number
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

function TablePurchaseProducts () {
  const { cartPurchase: { items, totalImport }, removeProductFromCart, clearCart } = useCartPurchase()
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const topContent = React.useMemo(() => {
    const hasItemsCart = items.length > 0
    const handleClick = () => {
      if (!hasItemsCart) {
        toast.success('El carrito ya está vació.')
        return
      }
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
  }, [items])

  const bottomContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-2'>
          <p className='uppercase'>Importe total: <strong>S/{totalImport.toFixed(2)}</strong></p>
        </div>
      </>
    )
  }, [totalImport])

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Tabla de productos para compra'
        topContent={topContent}
        topContentPlacement='outside'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
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
        <TableBody emptyContent='No hay productos en el carrito de compras' items={items}>
          {(item) => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.serialNumber || 'No aplica'}</TableCell>
              <TableCell>S/{item.cost.toFixed(2)}</TableCell>
              <TableCell>S/{item.priceSale.toFixed(2)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>S/{item.total.toFixed(2)}</TableCell>
              <TableCell>
                <Tooltip content='Eliminar' color='danger'>
                  <button onClick={() => removeProductFromCart(item.itemId)} className='block w-min text-danger cursor-pointer'><Yesicon fontSize={20} icon={ICONS.delete} /></button>
                </Tooltip>
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
                <p>¿Está seguro de limpíar carrito de compra?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  variant='ghost' color='warning' onPress={() => {
                    clearCart()
                    toast.success('Carrito de compras limpiado')
                    onClose()
                  }}
                >
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
