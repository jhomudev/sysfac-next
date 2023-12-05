import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import TableOperationsPerPurchase from '@/pages/Transactions/components/TableOperationsPerPurchase'
import { Operation, Purchase } from '@/types'
import { formatDate } from '@/utils'
import { Divider } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const data: Purchase = {
  id: 1,
  totalPay: 90,
  comments: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio omnis id voluptatum facere cum exercitationem. Voluptatibus quia dolor soluta nobis.',
  supplier: {
    id: 1,
    name: 'Proveedor 1'
  },
  user: {
    id: 1,
    username: 'pedro',
    fullname: 'Pedro de la cruz'
  },
  createdAt: '2023-11-16 09:07:12'
}

const operations:Operation[] = [
  {
    id: 1,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    unitCost: 23,
    quantity: 5,
    importSale: 34,
    transactionId: 1,
    productId: 2,
    createdAt: '2023-11-16 09:07:12'
  },
  {
    id: 2,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    unitCost: 23,
    quantity: 5,
    importSale: 34,
    transactionId: 1,
    productId: 2,
    createdAt: '2023-11-16 09:07:12'
  },
  {
    id: 3,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    unitCost: 23,
    quantity: 5,
    importSale: 34,
    transactionId: 1,
    productId: 2,
    createdAt: '2023-11-16 09:07:12'
  },
  {
    id: 4,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    unitCost: 23,
    quantity: 5,
    importSale: 34,
    transactionId: 1,
    productId: 2,
    createdAt: '2023-11-16 09:07:12'
  }
]

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
    label: 'Detalles de compra'
  }
]

type Props = {
  params: Params
}

function PurchasePage ({ params }: Props) {
  const { purchaseId } = params

  return (
    <>
      <h1 className='title-main'>Detalles de compra {purchaseId}</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <section className='flex flex-col-reverse md:flex-row md:justify-between gap-2'>
        <div>
          <dl>
            <dt className='title mb-0'>Usuario:</dt>
            <dd className='text mb-2'>{data.user.fullname}</dd>
            <dt className='title mb-0'>Proveedor:</dt>
            <dd className='text mb-2'>{data.supplier.name}</dd>
          </dl>
          <dl>
            <dt className='title mb-0'>Total pagado:</dt>
            <dd className='text mb-2'>S/{data.totalPay}</dd>
            <dt className='title mb-0'>Fecha:</dt>
            <dd className='text mb-2'>{formatDate(data.createdAt).dateLetter}</dd>
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
