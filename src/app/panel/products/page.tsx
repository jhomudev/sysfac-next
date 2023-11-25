'use client'
import TableProducts from '@/pages/Productos/componentes/TableProducts'
import { ESaleFor, Product } from '@/types'
import { Divider } from '@nextui-org/react'

const data:Product[] = [
  {
    id: 1,
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
    },
    createdAt: '2023-11-21 15:45:21',
    updateAt: '2023-11-21 15:45:21'
  },
  {
    id: 2,
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
    },
    createdAt: '2023-11-21 15:45:21',
    updateAt: '2023-11-21 15:45:21'
  },
  {
    id: 3,
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
    },
    createdAt: '2023-11-21 15:45:21',
    updateAt: '2023-11-21 15:45:21'
  }
]

function ProductsPage () {
  return (
    <div className='flex-1 p-2'>
      <h1 className='title-main'>Productos</h1>
      <p className='text'>Gestiona los productos dentro del sistema, agregue nuevos productos al inventario, modifique información o elimine los productos que considere.</p>
      <br />
      <Divider />
      <br />
      <TableProducts products={data} />
    </div>
  )
}
export default ProductsPage
