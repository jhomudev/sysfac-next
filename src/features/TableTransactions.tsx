import React from 'react'
import { EOperationType, EProofType } from '@/types/enumDB'
import { Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Chip, Selection, Input, Button, Pagination } from '@nextui-org/react'
import Yesicon from '@/components/Yesicon'
import { CLASS_ICONS } from '@/libs/yesicon'
import { TTransactions } from '@/types/types'
import { THeaderColumns } from '@/libs/nextui'

const headerColumns: THeaderColumns[] = [
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
  },
  {
    id: crypto.randomUUID(),
    name: 'Usuario',
    sortable: false
  }
]

const data:Partial<TTransactions>[] = [
  {
    transactionId: 1,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    client: {
      id: 1,
      names: 'Jose',
      lastnames: 'de la Fuente',
      dni: '71728342'
    },
    user: {
      id: 1,
      username: 'pedro',
      names: 'Pedro',
      lastnames: 'De la Cruz'
    }
  },
  {
    transactionId: 2,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    client: {
      id: 2,
      names: 'Yessica',
      lastnames: 'Morales',
      dni: '71728342'
    },
    user: {
      id: 2,
      username: 'pedro',
      names: 'Pedro',
      lastnames: 'De la Cruz'
    }
  },
  {
    transactionId: 3,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 2,
      name: 'Proveedor 2'
    },
    client: {
      id: 1,
      names: 'Jose',
      lastnames: 'de la Fuente',
      dni: '71728342'
    },
    user: {
      id: 1,
      username: 'pedro',
      names: 'Pedro',
      lastnames: 'De la Cruz'
    }
  }
]

function TableTransactions () {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)] mr-auto' placeholder='Buscar por usuario' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
          <Button color='success' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo compra</Button>
          <Button color='danger' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo venta</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de transacciones <span className='font-medium'>12</span></p>
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
    <div className='flex-1 p-2'>
      <Table
        isHeaderSticky
        aria-label='Tabla de transacciones'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]'
        }}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
      // sortDescriptor={sortDescriptor}
        topContent={topContent}
        bottomContent={bottomContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
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
        <TableBody emptyContent='No se econtraron transacciones' items={data}>
          {(item) => {
            const isSale = item.operationType === EOperationType.sell
            const isProofTicket = item.proofType === EProofType.ticket

            return (
              <TableRow key={item.transactionId}>
                <TableCell><Chip variant='flat' color={isSale ? 'danger' : 'success'}>{item.operationType}</Chip></TableCell>
                <TableCell><Chip variant='flat' color={isProofTicket ? 'warning' : 'secondary'}>{item.proofType}</Chip></TableCell>
                <TableCell>{item.totalImport?.toFixed(2)}</TableCell>
                <TableCell>{item.discount?.toFixed(2)}</TableCell>
                <TableCell>{item.totalPay?.toFixed(2)}</TableCell>
                <TableCell>{item.supplier?.name}</TableCell>
                <TableCell>{item.client?.names} {item.client?.lastnames}</TableCell>
                <TableCell>{item.user?.names} {item.user?.lastnames}</TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
    </div>
  )
}
export default TableTransactions
