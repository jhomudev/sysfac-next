import ROUTES from '@/app/routes'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { THeaderColumn } from '@/libs/nextui'
import { EOperationType, EProofType } from '@/types/enumDB'
import { TTransaction } from '@/types/types'
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Pagination,
  Selection,
  Table, TableBody,
  TableCell,
  TableColumn, TableHeader,
  TableRow
} from '@nextui-org/react'
import React from 'react'

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
    name: 'Proveedor'
  },
  {
    id: crypto.randomUUID(),
    name: 'Cliente'
  },
  {
    id: crypto.randomUUID(),
    name: 'Usuario'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

const data:Partial<TTransaction>[] = [
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
    operationType: EOperationType.buy,
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
          <Button as={Link} href={`${ROUTES.transactions}/purchases/new`} color='success' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo compra</Button>
          <Button as={Link} href={`${ROUTES.transactions}/sales/new`} color='danger' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo venta</Button>
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
    <>
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
            const isSale: boolean = item.operationType === EOperationType.sell
            const isProofTicket = item.proofType === EProofType.ticket
            const routeDetails = `${ROUTES.transactions}/${!isSale ? 'purchases' : 'sales'}/${item.transactionId}`

            return (
              <TableRow key={item.transactionId}>
                <TableCell><Chip variant='flat' color={isSale ? 'danger' : 'success'}>{item.operationType}</Chip></TableCell>
                <TableCell><Chip variant='dot' color={isProofTicket ? 'warning' : 'secondary'}>{item.proofType}</Chip></TableCell>
                <TableCell>{item.totalImport?.toFixed(2)}</TableCell>
                <TableCell>{item.discount?.toFixed(2)}</TableCell>
                <TableCell>{item.totalPay?.toFixed(2)}</TableCell>
                <TableCell>{item.supplier?.name}</TableCell>
                <TableCell>{item.client?.names} {item.client?.lastnames}</TableCell>
                <TableCell>{item.user?.names} {item.user?.lastnames}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size='sm' variant='light'>
                        <Yesicon icon={CLASS_ICONS.options} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label='actions'
                      variant='flat'
                    >
                      <DropdownItem key='view' startContent={<Yesicon icon={CLASS_ICONS.view} />} href={routeDetails}>Ver detalles</DropdownItem>
                      <DropdownItem className={`${!isSale && 'hidden'}`} key='ticket' startContent={<Yesicon icon={CLASS_ICONS.ticket} />} href={routeDetails} target='_blank'>Ver comprobante</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
    </>
  )
}
export default TableTransactions