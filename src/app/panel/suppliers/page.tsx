'use client'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { getFormatedDate } from '@/libs/utils/date'
import { TSupplier } from '@/types/types'
import { Divider, Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Input, Button, Pagination, Selection } from '@nextui-org/react'
import React from 'react'

const headerColumns = [
  {
    id: crypto.randomUUID(),
    name: 'RUC',
    sortable: false
  },
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
    name: 'Teléfono',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Fecha',
    sortable: true
  }
]

const data:Partial<TSupplier>[] = [
  {
    supplierId: 1,
    RUC: '112345676789',
    name: 'Proveedor 1',
    address: 'Jr. Marsical cacareees',
    phone: '998094343',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    supplierId: 2,
    RUC: '123456767892',
    name: 'Proveedor 2',
    address: 'Av. Aasambleas',
    phone: '998998998',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    supplierId: 3,
    RUC: '123456767898',
    name: 'Proveedor 3',
    address: 'Jr. Bellido',
    phone: '900990009',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    supplierId: 4,
    RUC: '1345656767898',
    name: 'Proveedor 4',
    address: 'Jr. Peresz de Regollar',
    phone: '968230122',
    createdAt: '2023-11-09 10:03:07'
  }
]

function Supplierspage () {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar proveedor' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
          <Button color='primary' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo proveedor</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de proveedores <span className='font-medium'>12</span></p>
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
      <h1 className='title-main'>Proveedores</h1>
      <p className='text'>Gestione los los proveedores que tiene la empresa, agregue, modifique datos, etc.</p>
      <br />
      <Divider />
      <br />
      <Table
        isHeaderSticky
        aria-label='Tabla de usuarios'
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
        <TableBody emptyContent='No se econtraron proveedores' items={data}>
          {(item) => (
            <TableRow key={item.supplierId}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.RUC}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.createdAt && getFormatedDate(item.createdAt).dateLetter}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
export default Supplierspage
