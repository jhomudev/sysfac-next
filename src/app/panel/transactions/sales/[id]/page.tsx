import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import TableOperationsPerSale from '@/features/TableOperationsPerSale'
import { getFormatedDate } from '@/libs/utils/date'
import { EOperationType, EProofType } from '@/types/enumDB'
import { TOperation, TTransaction } from '@/types/types'
import { Button, Divider, Link } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const data: TTransaction = {
  transactionId: 1,
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

const operations:TOperation[] = [
  {
    operationId: 1,
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
    operationId: 2,
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
    operationId: 3,
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
    operationId: 4,
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
    label: 'Detalles de venta'
  }
]

type Props = {
  params: Params
}

function SalePage ({ params }: Props) {
  const transactionId = params.id

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
            <dd className='text mb-2'>{data.user.names + ' ' + data.user.lastnames}</dd>
            <dt className='title mb-0'>Cliente:</dt>
            <dd className='text mb-2'>{data.client.names + ' ' + data.client.lastnames}</dd>
          </dl>
          <dl>
            <dt className='title mb-0'>Importe:</dt>
            <dd className='text mb-2'>S/{data.totalImport}</dd>
            <dt className='title mb-0'>Descuento:</dt>
            <dd className='text mb-2'>S/{data.discount}</dd>
            <dt className='title mb-0'>Total pagado:</dt>
            <dd className='text mb-2'>S/{data.totalPay}</dd>
            <dt className='title mb-0'>Fecha:</dt>
            <dd className='text mb-2'>{getFormatedDate(data.createdAt).dateLetter}</dd>
          </dl>
        </div>
        <Button startContent={<Yesicon icon={CLASS_ICONS.ticket} />} as={Link} href={`${ROUTES.transactions}/sales/${transactionId}`} target='_blank' color='secondary' variant='flat'>Ver comprobante</Button>
      </section>
      <br />
      <h2 className='title'>Movimientos</h2>
      <TableOperationsPerSale items={operations} />
    </>
  )
}
export default SalePage
