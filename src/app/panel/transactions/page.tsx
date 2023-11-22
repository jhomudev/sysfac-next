import ROUTES from '@/app/routes'
import { CardEntityDashboard, CardGraphic, Yesicon } from '@/components'
import { CLASS_ICONS } from '@/components/Yesicon'
import { ChartTransactions } from '@/features'
import { NEXTUI_COLORS } from '@/libs'
import { EOperationType, EProofType, Transaction } from '@/models'
import { TableTransactions } from '@/pages/Transactions/components'
import { Card, CardBody, Divider, Link } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React from 'react'

const itemsTransactions = [
  {
    label: 'Ventas',
    quantity: 200,
    color: NEXTUI_COLORS.danger,
    icon: CLASS_ICONS.sales
  },
  {
    label: 'Compras',
    quantity: 200,
    color: NEXTUI_COLORS.success,
    icon: CLASS_ICONS.purchases
  }
]

const data: Transaction[] = [
  {
    id: 1,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
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
    proofCode: 'DW3443',
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    id: 2,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    client: {
      id: 2,
      names: 'Yessica',
      lastnames: 'Morales',
      dni: '71728342'
    },
    user: {
      id: 2,
      username: 'pedro',
      names: 'Pedro',
      lastnames: 'De la Cruz'
    },
    proofCode: 'DW3443',
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    id: 3,
    operationType: EOperationType.buy,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 2,
      name: 'Proveedor 2'
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
    proofCode: 'DW3443',
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  }
]

function TransactionsPage () {
  return (
    <>
      <h1 className='title-main'>Transacciones</h1>
      <p className='text'>
        Observe y gestione las transacciones realizadas dentro el sistema, Tiene el control de las acciones sobre las ventas y compras,
        entradas y salidas de los productos.
      </p><br />
      <Divider />
      <br />
      <div className='flex gap-5 flex-col lg:flex-row'>
        <div className='w-full lg:min-w-[300px] lg:w-[min(100%,400px)] flex flex-col gap-5'>
          <div className='flex-1 flex flex-col gap-5'>
            {
            itemsTransactions.map(item => (
              <CardEntityDashboard
                key={item.label}
                color={item.color}
                label={item.label}
                icon={item.icon}
                quantity={item.quantity}
              />
            ))
          }
          </div>
          <div className='flex-1 flex flex-col md:flex-row lg:flex-col gap-5 h-full'>
            <motion.article
              className='flex flex-1 h-full min-h-[100px]'
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card as={Link} href={`${ROUTES.transactions}/purchases/new`} className='border-success border-2 flex-1 '>
                <CardBody className='flex flex-row gap-3 items-center justify-center text-success'>
                  <Yesicon fontSize={20} icon={CLASS_ICONS.plus} />
                  <span>Nueva compra</span>
                </CardBody>
              </Card>
            </motion.article>
            <motion.article
              className='flex flex-1 h-full min-h-[100px]'
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card as={Link} href={`${ROUTES.transactions}/sales/new`} className='border-danger border-2  flex-1'>
                <CardBody className='flex flex-row gap-3 items-center justify-center text-danger'>
                  <Yesicon fontSize={20} icon={CLASS_ICONS.plus} />
                  <span>Nueva venta</span>
                </CardBody>
              </Card>
            </motion.article>
          </div>
        </div>
        <CardGraphic
          className='w-full p-4'
          title='Análisis de movimientos'
          description='El gráfico muestra las ventas y compras mensuales a lo largo del tiempo. Puede ver cómo las transacciones han variado mes a mes.'
        >
          <ChartTransactions />
        </CardGraphic>
      </div>
      <br />
      <Divider />
      <br />
      <h2 className='title'>Transacciones realizadas</h2>
      <p className='text'>Gestiona las transacciones realizadas por los usuarios.</p>
      <br />
      <TableTransactions transactions={data} />
    </>
  )
}
export default TransactionsPage
