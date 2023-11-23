'use client'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Location } from '@/types/Location'
import { TableHeaderColumns } from '@/types/components'
import { ELocationType } from '@/types/enums.d'
import formatDate from '@/utils/formatDate'
import { Button, Chip, Input, Pagination, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

const headerColumns: TableHeaderColumns[] = [
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

type Props = {
  locations: Location[]
}

function TableLocations ({ locations }: Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar local' startContent={<Yesicon icon={ICONS.search} />} />
          <Button color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo local</Button>
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
        <TableBody emptyContent='No se econtraron locals' items={locations}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell><Chip variant='flat' color={item.type === ELocationType.store ? 'warning' : 'secondary'}>{item.type}</Chip></TableCell>
              <TableCell><Chip variant='dot' color={item.canStoreMore ? 'primary' : 'danger'}>{item.canStoreMore ? 'Sí' : 'No'}</Chip></TableCell>
              <TableCell>{item.createdAt && formatDate(item.createdAt).dateLetter}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  // </div>
  )
}
export default TableLocations
