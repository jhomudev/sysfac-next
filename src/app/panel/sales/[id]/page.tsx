import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import TableOperationsPerSale from '@/modules/Transactions/components/TableOperationsPerSale'
import { getOperationsByTransactionId, getSaleById } from '@/modules/Transactions/services'
import formatDate from '@/utils/formatDate'
import { Button, Divider, Link } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const breadcrumbItems: MyBreadcrumbItemProps[] = [
  {
    label: 'Home',
    route: ROUTES.panel
  },
  {
    label: 'Ventas',
    route: ROUTES.transactions + '/sales'
  },
  {
    label: 'Detalles de venta'
  }
]

type Props = {
  params: Params
}

async function SalePage ({ params }: Props) {
  const { id } = params
  const sale = await getSaleById(id)
  const operations = (await getOperationsByTransactionId(id)) || []
  if (!sale) return <p className='text-danger'>Venta no encontrada</p>
  if (!operations) console.log('No se encontraron operaciones de esta venta')

  return (
    <>
      <h1 className='title-main'>Detalles de venta</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <section className='flex flex-col-reverse md:flex-row md:justify-between gap-2'>
        <div>
          <dl>
            <dt className='title mb-0'>Usuario:</dt>
            <dd className='text mb-2'>{sale.user.fullname}</dd>
            <dt className='title mb-0'>Cliente:</dt>
            <dd className='text mb-2'>{sale.client.fullname}</dd>
          </dl>
          <dl>
            <dt className='title mb-0'>Importe:</dt>
            <dd className='text mb-2'>S/{sale.totalImport}</dd>
            <dt className='title mb-0'>Descuento:</dt>
            <dd className='text mb-2'>S/{sale.discount}</dd>
            <dt className='title mb-0'>Total pagado:</dt>
            <dd className='text mb-2'>S/{sale.totalPay}</dd>
            <dt className='title mb-0'>Fecha:</dt>
            <dd className='text mb-2'>{formatDate(sale.createdAt).dateLetter}</dd>
          </dl>
        </div>
        <Button startContent={<Yesicon icon={ICONS.ticket} />} as={Link} href={`${ROUTES.sales}/${id}`} target='_blank' color='secondary' variant='flat'>Ver comprobante</Button>
      </section>
      <br />
      <h2 className='title'>Movimientos</h2>
      <TableOperationsPerSale items={operations} />
    </>
  )
}
export default SalePage
