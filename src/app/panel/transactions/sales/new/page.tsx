import ROUTES from '@/app/routes'
import { MyBreadcrumbs } from '@/components'
import { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { ESaleFor } from '@/models'
import { Product } from '@/pages/Productos/models'
import { FilterProductsPerSale, ListProductsPerSale } from '@/pages/Transactions/components'
import { Divider, Input } from '@nextui-org/react'

const breadcrumbItems: MyBreadcrumbItemProps[] = [
  {
    label: 'Home',
    route: ROUTES.panel
  },
  {
    label: 'Transacciones',
    route: ROUTES.transactions
  },
  {
    label: 'Nueva venta'
  }
]

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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
  },
  {
    id: 4,
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
  },
  {
    id: 5,
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
  },
  {
    id: 6,
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
  },
  {
    id: 7,
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
  },
  {
    id: 8,
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
    createdAt: '2023-11-09 10:03:07',
    updateAt: '2023-11-09 10:03:07'
  }
]

function NewSalePage () {
  return (
    <>
      <h1 className='title-main'>Nueva venta</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <h2 className='title'>Productos</h2>
      <p className='text'>Agregue productos al carrito de venta.</p>
      <br />
      <div className='flex flex-col md:flex-row justify-between gap-3'>
        <Input isClearable className='w-full md:max-w-md' startContent={<Yesicon icon={CLASS_ICONS.search} />} placeholder='Buscar producto' />
        {/* <Button className='w-full md:w-min' color='warning' variant='ghost'>Ver carrito</Button> */}
      </div>
      <br />
      <FilterProductsPerSale />
      <br />
      <ListProductsPerSale products={products} />
    </>
  )
}
export default NewSalePage
