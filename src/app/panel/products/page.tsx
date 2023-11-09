'use client'
import Yesicon from '@/components/Yesicon'
import { CLASS_ICONS } from '@/libs/yesicon'
import { ESaleFor, EStateProduct } from '@/types/enumDB'
import { TProduct } from '@/types/types'
import { Divider, Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Chip, Input, Button, Pagination, Selection, Avatar } from '@nextui-org/react'
import React from 'react'

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

const data:TProduct[] = [
  {
    productId: 1,
    name: 'Pc Hp',
    image: 'https://unavatar.io/pikachu',
    inventaryMin: 5,
    priceSale: 12.50,
    unit: 'Unidad',
    saleFor: ESaleFor.unit,
    isActive: true,
    category: {
      id: 1,
      slug: 'pc',
      name: 'Pc'
    }
  },
  {
    productId: 2,
    name: 'Laptop Hp',
    image: 'https://unavatar.io/pikachu',
    inventaryMin: 5,
    priceSale: 1200.50,
    unit: 'Unidad',
    saleFor: ESaleFor.unit,
    isActive: true,
    category: {
      id: 1,
      slug: 'laptop',
      name: 'Laptop'
    }
  },
  {
    productId: 3,
    name: 'Mouse Avatar',
    image: 'https://unavatar.io/spirit',
    inventaryMin: 5,
    priceSale: 60.50,
    unit: 'Unidad',
    saleFor: ESaleFor.quantity,
    isActive: false,
    category: {
      id: 1,
      slug: 'mouse',
      name: 'Mouse'
    }
  }
]

function ProductsPage () {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar por usuario' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
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
    <div className='flex-1 p-2'>
      <h1 className='text-2xl font-medium mb-3'>Productos</h1>
      <Divider />
      <br />
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
        // onSortChange={() = >{}}
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
        <TableBody emptyContent='No se econtraron usuarios' items={data}>
          {(item) => {
            const isActive = item.isActive
            const saleForUnit = item.saleFor === ESaleFor.unit
            return (
              <TableRow key={item.productId}>
                <TableCell><Avatar src={item.image} className='w-20 h-20 text-large' radius='md' /></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>{item.inventaryMin}</TableCell>
                <TableCell>{item.priceSale.toFixed(2)}</TableCell>
                <TableCell><Chip variant='flat' color={`${saleForUnit ? 'secondary' : 'warning'}`}>{item.saleFor}</Chip></TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell><Chip variant='flat' color={`${isActive ? 'success' : 'danger'}`}>{isActive ? EStateProduct.active : EStateProduct.active}</Chip></TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
    </div>
  )
}
export default ProductsPage
