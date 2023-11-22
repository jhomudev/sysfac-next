'use client'
import { THeaderColumn } from '@/libs/nextui'
import { TOperation } from '@/types/types'
import {
  Table, TableBody,
  TableCell,
  TableColumn, TableHeader,
  TableRow
} from '@nextui-org/react'

type Props = {
  items: TOperation[]
}

const headerColumns: THeaderColumn[] = [
  {
    id: crypto.randomUUID(),
    name: 'Descripción'
  },
  {
    id: crypto.randomUUID(),
    name: 'Detalles'
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio unitario'
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

function TableOperationsPerSale ({ items }: Props) {
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
          <TableRow key={item.operationId}>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.details || 'No hay detalles'}</TableCell>
            <TableCell>S/{item.priceSale}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>S/{item.importSale}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
export default TableOperationsPerSale
