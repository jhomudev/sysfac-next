'use client'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { TClient } from '@/types/types'
import { Divider, Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Input, Pagination, Selection } from '@nextui-org/react'
import React from 'react'

const headerColumns = [
  {
    id: crypto.randomUUID(),
    name: 'RUC',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'DNI',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Nombres',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Apellidos',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Dirección',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Teléfono',
    sortable: false
  }
]

const data:Partial<TClient>[] = [
  {
    clientId: 1,
    RUC: null,
    dni: '71730987',
    names: 'Juan',
    lastnames: 'Perez',
    address: 'Jr. Orquideas',
    phone: '123456789'
  },
  {
    clientId: 2,
    RUC: '123456789123',
    dni: null,
    names: 'Carlos',
    lastnames: 'Ramirez',
    address: 'Jr. Juan Yucra',
    phone: '123456780'
  }
]

function ClientsPage () {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar cliente' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de clientes <span className='font-medium'>12</span></p>
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
      <h1 className='title-main'>Clientes</h1>
      <p className='text'>Observe los clientes que tuvo durante todo su progreso con el sistema, si necesita puede modificar algunos datos del cliente.</p>
      <br />
      <Divider />
      <br />
      <Table
        isHeaderSticky
        aria-label='Tabla de clientes'
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
        // onSortChange={() = >{}}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              className='uppercase'
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent='No se econtraron clientes' items={data}>
          {(item) => (
            <TableRow key={item.clientId}>
              <TableCell>{item.RUC ?? 'No aplica'}</TableCell>
              <TableCell>{item.dni ?? 'No aplica'}</TableCell>
              <TableCell>{item.names}</TableCell>
              <TableCell>{item.lastnames}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phone}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
export default ClientsPage
