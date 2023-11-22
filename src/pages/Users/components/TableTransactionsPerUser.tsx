'use client'
import { THeaderColumn } from '@/libs/nextui'
import { Transaction } from '@/models'
import { EOperationType, EProofType } from '@/types/enumDB'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Chip } from '@nextui-org/react'

type Props = {
  data: Partial<Transaction>[]
}

const headerColumns: THeaderColumn[] = [
  {
    id: crypto.randomUUID(),
    name: 'Tipo',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Comprobante',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Importe',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Descuento',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Total',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Proveedor',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Cliente',
    sortable: false
  }
]

function TableTransactionsPerUser ({ data }: Props) {
  return (
    <Table
      isHeaderSticky
      aria-label='Tabla de movimientos de usuario'
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[382px]'
      }}
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
      <TableBody emptyContent='Sin movimientos' items={data}>
        {(item) => {
          const isSale = item.operationType === EOperationType.sell
          const isProofTicket = item.proofType === EProofType.ticket

          return (
            <TableRow key={item.id}>
              <TableCell><Chip variant='flat' color={isSale ? 'danger' : 'success'}>{item.operationType}</Chip></TableCell>
              <TableCell><Chip variant='dot' color={isProofTicket ? 'warning' : 'secondary'}>{item.proofType}</Chip></TableCell>
              <TableCell>{item.totalImport?.toFixed(2)}</TableCell>
              <TableCell>{item.discount?.toFixed(2)}</TableCell>
              <TableCell>{item.totalPay?.toFixed(2)}</TableCell>
              <TableCell>{item.supplier?.name}</TableCell>
              <TableCell>{item.client?.names} {item.client?.lastnames}</TableCell>
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
export default TableTransactionsPerUser
