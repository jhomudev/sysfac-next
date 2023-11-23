import { CLASS_ICONS, Yesicon } from '@/components'
import { useCart } from '@/hooks'
import { TableHeaderColumns } from '@/models'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'

const headerColumns: TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Producto'
  },
  {
    id: crypto.randomUUID(),
    name: 'NS'
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio'
  },
  {
    id: crypto.randomUUID(),
    name: 'Cantidad'
  },
  {
    id: crypto.randomUUID(),
    name: 'Total'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function CartTableItems () {
  const {
    cart: {
      items
    },
    removeProductFromCart,
    gratifyProduct
  } = useCart()

  return (
    <Table
      className='w-full md:w-[70%]'
      isHeaderSticky
      aria-label='Tabla de productos para compra'
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
      <TableBody emptyContent='No se econtraron productos en el carrito de venta' items={items}>
        {(item) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell>{item.product}</TableCell>
            <TableCell>{item.serialNumber ?? 'No aplica'}</TableCell>
            <TableCell>{item.unitPrice.toFixed(2)}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.total.toFixed(2)}</TableCell>
            <TableCell>
              <div className='flex gap-1'>
                <Tooltip content='Eliminar' color='danger'>
                  <button
                    onClick={() => {
                      removeProductFromCart(item.itemId)
                    }} className='block w-min text-danger cursor-pointer'
                  >
                    <Yesicon fontSize={20} icon={CLASS_ICONS.delete} />
                  </button>
                </Tooltip>
                <Tooltip content='Gratificar' color='success'>
                  <button
                    onClick={() => {
                      gratifyProduct(item.itemId)
                    }}
                    className='block w-min text-success cursor-pointer'
                  >
                    <Yesicon fontSize={20} icon={CLASS_ICONS.tag} />
                  </button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
export default CartTableItems
