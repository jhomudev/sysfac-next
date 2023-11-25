import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormPurchaseAddProducts from '@/pages/Transactions/components/FormPurchaseAddProducts'
import FormPurchaseConfirm from '@/pages/Transactions/components/FormPurchaseConfirm'
import TablePurchaseProducts, { TablePurchaseProductsItem } from '@/pages/Transactions/components/TablePurchaseProducts'
import { Product, Supplier, ESaleFor } from '@/types'

import { Divider } from '@nextui-org/react'

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
    label: 'Nueva compra'
  }
]

const data:TablePurchaseProductsItem[] = [
  {
    product: 'laptop gamer Hp 1',
    cost: 12.60,
    priceSale: 15.00,
    quantity: 5,
    serialnumber: 'SDFWERSDGDFGSDFE',
    total: 230.30
  },
  {
    product: 'laptop gamer Hp 1',
    cost: 12.60,
    priceSale: 15.00,
    quantity: 5,
    serialnumber: 'SDFWERSDGDFGSDFE',
    total: 230.30
  },
  {
    product: 'laptop gamer Hp 1',
    cost: 12.60,
    priceSale: 15.00,
    quantity: 5,
    serialnumber: 'SDFWERSDGDFGSDFE',
    total: 230.30
  },
  {
    product: 'laptop gamer Hp 1',
    cost: 12.60,
    priceSale: 15.00,
    quantity: 5,
    serialnumber: 'SDFWERSDGDFGSDFE',
    total: 230.30
  },
  {
    product: 'laptop gamer Hp 1',
    cost: 12.60,
    priceSale: 15.00,
    quantity: 5,
    serialnumber: 'SDFWERSDGDFGSDFE',
    total: 230.30
  },
  {
    product: 'laptop gamer Hp 1',
    cost: 12.60,
    priceSale: 15.00,
    quantity: 5,
    serialnumber: 'SDFWERSDGDFGSDFE',
    total: 230.30
  }
]

const suppliers: Supplier[] = [
  {
    id: 1,
    ruc: '112345676789',
    name: 'Proveedor 1',
    address: 'Jr. Marsical cacareees',
    phone: '998094343',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 2,
    ruc: '123456767892',
    name: 'Proveedor 2',
    address: 'Av. Aasambleas',
    phone: '998998998',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 3,
    ruc: '123456767898',
    name: 'Proveedor 3',
    address: 'Jr. Bellido',
    phone: '900990009',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 4,
    ruc: '1345656767898',
    name: 'Proveedor 4',
    address: 'Jr. Peresz de Regollar',
    phone: '968230122',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
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

function NewPurchasePage () {
  return (
    <>
      <h1 className='title-main'>Nueva compra</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <FormPurchaseAddProducts products={products} />
      <br />
      <TablePurchaseProducts dataProducts={data} />
      <br />
      <FormPurchaseConfirm suppliers={suppliers} />
    </>
  )
}
export default NewPurchasePage
