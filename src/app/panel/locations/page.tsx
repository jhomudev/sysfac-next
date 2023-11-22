'use client'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { getFormatedDate } from '@/libs/utils/date'
import { ELocationType } from '@/types/enumDB'
import { TLocation } from '@/types/types'
import { Divider, Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Chip, Input, Button, Pagination, Selection } from '@nextui-org/react'
import React from 'react'

const headerColumns = [
  {
    id: crypto.randomUUID(),
    name: 'Nombre',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Dirección',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Tipo',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'canStore',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Fecha',
    sortable: true
  }
]

const data:TLocation[] = [
  {
    localId: 1,
    name: 'Local 1',
    type: ELocationType.warehouse,
    address: 'Jr. Libertad',
    canStoreMore: true,
    createdAt: '2023-11-09 10:03:07'
  },
  {
    localId: 2,
    name: 'Local 2',
    type: ELocationType.store,
    address: 'Jr. Asambleas',
    canStoreMore: true,
    createdAt: '2023-11-09 10:03:07'
  },
  {
    localId: 3,
    name: 'Local 3',
    type: ELocationType.store,
    address: 'Jr. Bellido',
    canStoreMore: false,
    createdAt: '2023-11-09 10:03:07'
  }
]

function LocationsPage () {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar local' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
          <Button color='primary' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo local</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de locales <span className='font-medium'>12</span></p>
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
  // <div className='flex-1 p-2'>
    <>
      <h1 className='title-main'>Locales</h1>
      <p className='text'>Gestione los locales de la empresa o negocio, agregue o quite locales, es importante tener registrados los locales en donde circulan los productos.</p>
      <br />
      <Divider />
      <br />
      <Table
        isHeaderSticky
        aria-label='Tabla de locals'
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
              className='uppercase'
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent='No se econtraron locals' items={data}>
          {(item) => (
            <TableRow key={item.localId}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell><Chip variant='flat' color={item.type === ELocationType.store ? 'warning' : 'secondary'}>{item.type}</Chip></TableCell>
              <TableCell><Chip variant='dot' color={item.canStoreMore ? 'primary' : 'danger'}>{item.canStoreMore ? 'Sí' : 'No'}</Chip></TableCell>
              <TableCell>{item.createdAt && getFormatedDate(item.createdAt).dateLetter}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  // </div>
  )
}
export default LocationsPage
