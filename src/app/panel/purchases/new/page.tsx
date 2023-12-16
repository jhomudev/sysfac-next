import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormPurchaseAddProducts from '@/modules/Transactions/components/FormPurchaseAddProducts'
import FormPurchaseConfirm from '@/modules/Transactions/components/FormPurchaseConfirm'
import TablePurchaseProducts from '@/modules/Transactions/components/TablePurchaseProducts'
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
