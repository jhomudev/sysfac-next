import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormPurchaseAddProducts from '@/pages/Transactions/components/FormPurchaseAddProducts'
import FormPurchaseConfirm from '@/pages/Transactions/components/FormPurchaseConfirm'
import TablePurchaseProducts from '@/pages/Transactions/components/TablePurchaseProducts'
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

function NewPurchasePage () {
  return (
    <>
      <h1 className='title-main'>Nueva compra</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <FormPurchaseAddProducts />
      <br />
      <TablePurchaseProducts />
      <br />
      <FormPurchaseConfirm />
    </>
  )
}
export default NewPurchasePage
