import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormPurchaseAddProducts from '@/features/FormPurchaseAddProducts'
import FormPurchaseConfirm from '@/features/FormPurchaseConfirm'
import TablePurchaseProducts, { TablePurchaseProductsItem } from '@/features/TablePurchaseProducts'
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

function NewPurchasePage () {
  return (
    <>
      <h1 className='title-main'>Nueva compra</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <FormPurchaseAddProducts />
      <br />
      <TablePurchaseProducts dataProducts={data} />
      <br />
      <FormPurchaseConfirm />
    </>
  )
}
export default NewPurchasePage
