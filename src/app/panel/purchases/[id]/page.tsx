import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import TableOperationsPerPurchase from '@/pages/Transactions/components/TableOperationsPerPurchase'
import { getOperationsByTransactionId, getPurchaseById } from '@/pages/Transactions/services'
import { formatDate } from '@/utils'
import { Divider } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const breadcrumbItems: MyBreadcrumbItemProps[] = [
  {
    label: 'Home',
    route: ROUTES.panel
  },
  {
    label: 'Compras',
    route: ROUTES.transactions + '/purchases'
  },
  {
    label: 'Detalles de compra'
  }
]

type Props = {
  params: Params
}

async function PurchasePage ({ params }: Props) {
  const { id } = params
  const purchase = await getPurchaseById(id)
  const operations = (await getOperationsByTransactionId(id)) || []
  if (!purchase) return <p className='text-danger'>Compra no encontrada</p>
  if (!operations) console.log('No se encontraron operaciones de esta compra')

  return (
    <>
      <h1 className='title-main'>Detalles de compra</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <section className='flex flex-col-reverse md:flex-row md:justify-between gap-2'>
        <div>
          <dl>
            <dt className='title mb-0'>Usuario:</dt>
            <dd className='text mb-2'>{purchase.user.fullname}</dd>
            <dt className='title mb-0'>Proveedor:</dt>
            <dd className='text mb-2'>{purchase.supplier.name}</dd>
          </dl>
          <dl>
            <dt className='title mb-0'>Total pagado:</dt>
            <dd className='text mb-2'>S/{purchase.totalPay}</dd>
            <dt className='title mb-0'>Fecha:</dt>
            <dd className='text mb-2'>{formatDate(purchase.createdAt).dateLetter}</dd>
          </dl>
        </div>
      </section>
      <br />
      <h2 className='title'>Movimientos</h2>
      <TableOperationsPerPurchase items={operations} />
    </>
  )
}
export default PurchasePage
