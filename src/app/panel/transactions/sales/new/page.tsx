import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import FiltersProductsPerSale from '@/features/FiltersProductsPerSale'
import ListProductsPerSale from '@/features/ListProductsPerSale'
import { ESaleFor } from '@/types/enumDB'
import { TProduct } from '@/types/types'
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

const products:TProduct[] = [
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
  },
  {
    productId: 4,
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
  },
  {
    productId: 5,
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
  },
  {
    productId: 6,
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
  },
  {
    productId: 7,
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
  },
  {
    productId: 8,
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
      <FiltersProductsPerSale />
      <br />
      <ListProductsPerSale products={products} />
    </>
  )
}
export default NewSalePage
