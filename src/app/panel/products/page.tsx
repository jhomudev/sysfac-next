import TableProducts from '@/pages/Productos/componentes/TableProducts'
import { ESaleFor, Product } from '@/types'

const products:Product[] = [
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
    updatedAt: '2023-11-21 15:45:21'
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
    updatedAt: '2023-11-21 15:45:21'
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
    updatedAt: '2023-11-21 15:45:21'
  }
]

function ProductsPage () {
  return (
    <>
      <TableProducts products={products} />
    </>
  )
}
export default ProductsPage
