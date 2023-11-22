'use client'
import { ESaleFor, EStateProduct } from '@/models'
import {
  Table, TableBody, TableColumn, TableHeader, TableCell, TableRow,
  Chip, Input, Button, Pagination, Selection, Avatar
} from '@nextui-org/react'
import React from 'react'
import { Product } from '../models/product.model'
import { Yesicon } from '@/components'
import { CLASS_ICONS } from '@/components/Yesicon'

type THEaderColumns = {
  id: string,
  name: string,
  sortable: boolean,
  align?: 'start' | 'center' | 'end'
}

const headerColumns: THEaderColumns[] = [
  {
    id: crypto.randomUUID(),
    name: 'Imagen',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'name',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Categoría',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Mínimo en inventario',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Precio de venta',
    align: 'end',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Unidad de venta',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Venta por',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Estado',
    sortable: true
  }
]

type Props = {
  products: Product[]
}

function TableProducts ({ products }:Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar producto' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
          <Button color='primary' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo producto</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de produtos <span className='font-medium'>12</span></p>
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
        aria-label='Tabla de productos'
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
              align={column.align ?? 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent='No se econtraron productos' items={products}>
          {(item) => {
            const isActive = item.isActive
            const saleForUnit = item.saleFor === ESaleFor.unit
            return (
              <TableRow key={item.id}>
                <TableCell><Avatar src={item.image} className='w-20 h-20 text-large' radius='md' /></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>{item.inventaryMin}</TableCell>
                <TableCell>{item.priceSale.toFixed(2)}</TableCell>
                <TableCell><Chip variant='flat' color={`${saleForUnit ? 'secondary' : 'warning'}`}>{item.saleFor}</Chip></TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell><Chip variant='dot' color={`${isActive ? 'success' : 'danger'}`}>{isActive ? EStateProduct.active : EStateProduct.inactive}</Chip></TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
    </>
  )
}
export default TableProducts
