import ROUTES from '@/app/routes'
import { MyBreadcrumbs } from '@/components'
import { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import { formatDate } from '@/libs'
import { EOperationType, EProofType, Transaction } from '@/models'
import { TableOperationsPerPurchase } from '@/pages/Transactions/components'
import { Operation } from '@/pages/Transactions/models'
import { Divider } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const data: Transaction = {
  id: 1,
  operationType: EOperationType.sell,
  proofCode: 'P-00002023',
  proofType: EProofType.invoice,
  totalImport: 100,
  discount: 10,
  totalPay: 90,
  comments: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio omnis id voluptatum facere cum exercitationem. Voluptatibus quia dolor soluta nobis.',
  supplier: {
    id: 1,
    name: 'Proveedor 1'
  },
  client: {
    id: 1,
    names: 'Jose',
    lastnames: 'de la Fuente',
    dni: '71728342'
  },
  user: {
    id: 1,
    username: 'pedro',
    names: 'Pedro',
    lastnames: 'De la Cruz'
  },
  createdAt: '2023-11-16 09:07:12'
}

const operations:Operation[] = [
  {
    id: 1,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    priceSale: 23,
    quantity: 5,
    importSale: 34,
    createdAt: '2023-11-16 09:07:12',
    transactionId: 1
  },
  {
    id: 2,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    priceSale: 23,
    quantity: 5,
    importSale: 34,
    createdAt: '2023-11-16 09:07:12',
    transactionId: 1
  },
  {
    id: 3,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    priceSale: 23,
    quantity: 5,
    importSale: 34,
    createdAt: '2023-11-16 09:07:12',
    transactionId: 1
  },
  {
    id: 4,
    serialNumber: 'sdfgw4536sdfg',
    description: 'Laptop HP Lenovo I5',
    details: '',
    priceSale: 23,
    quantity: 5,
    importSale: 34,
    createdAt: '2023-11-16 09:07:12',
    transactionId: 1
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
            <dd className='text mb-2'>{data.user.names + ' ' + data.user.lastnames}</dd>
            <dt className='title mb-0'>Proveedor:</dt>
            <dd className='text mb-2'>{data.supplier.name}</dd>
          </dl>
          <dl>
            {/* <dt className='title mb-0'>Importe:</dt> */}
            {/* <dd className='text mb-2'>S/{data.totalImport}</dd> */}
            {/* <dt className='title mb-0'>Descuento:</dt>
            <dd className='text mb-2'>S/{data.discount}</dd> */}
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
