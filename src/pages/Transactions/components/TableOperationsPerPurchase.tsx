'use client'
import { THeaderColumn } from '@/libs'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Operation } from '../models'

type Props = {
  items: Operation[]
}

const headerColumns: THeaderColumn[] = [
  {
    id: crypto.randomUUID(),
    name: 'Descripción'
  },
  {
    id: crypto.randomUUID(),
    name: 'NUmero de serie'
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio de compra'
  },
  {
    id: crypto.randomUUID(),
    name: 'Cantidad'
  },
  {
    id: crypto.randomUUID(),
    name: 'Importe'
  }
]

function TableOperationsPerPurchase ({ items }: Props) {
  return (
    <Table
      isHeaderSticky
      aria-label='Tabla de operaciones'
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.id}
            className='uppercase'
            align={column.align ?? 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent='No se econtraron operaciones' items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.serialNumber || 'N.A.'}</TableCell>
            <TableCell>S/{item.priceSale}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>S/{item.importSale}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
export default TableOperationsPerPurchase
