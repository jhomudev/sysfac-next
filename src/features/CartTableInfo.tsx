'use client'
import { useCart } from '@/hooks'
import { NEXT_PUBLIC_IGV as IGV } from '@/libs/utils'
import { TableHeaderColumns } from '@/models'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

const headerColumns:TableHeaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Importe'
  },
  {
    id: crypto.randomUUID(),
    name: 'Descuento'
  },
  {
    id: crypto.randomUUID(),
    name: 'IGV'
  },
  {
    id: crypto.randomUUID(),
    name: 'Total a pagar'
  }
]

function CartTableInfo () {
  const {
    cart: {
      _import,
      discount,
      totalImport
    }
  } = useCart()

  return (
    <Table
      fullWidth
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
      <TableBody emptyContent='No hay data'>
        <TableRow key={crypto.randomUUID()}>
          <TableCell>S/ {_import.toFixed(2)}</TableCell>
          <TableCell>S/ {discount.toFixed(2)}</TableCell>
          <TableCell>{IGV}%</TableCell>
          <TableCell>S/ {totalImport.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
export default CartTableInfo
