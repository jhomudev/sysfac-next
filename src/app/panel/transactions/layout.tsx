import { CardEntityDashboardProps } from '@/components/CardEntityDashboard'
import CardGraphic from '@/components/CardGraphic'
import ListCardEntity from '@/components/ListCardEntity'
import { COLORS_ENT, ICONS } from '@/contants'
import ChartTransactions from '@/features/ChartTransactions'
import ListTransactions from '@/features/ListTransactions'
import CardsTransactions from '@/pages/Transactions/components/CardsTransactions'
import TabTransactions from '@/pages/Transactions/components/TabTransactions'
import { Divider } from '@nextui-org/react'
import React from 'react'

const itemsTransactions: CardEntityDashboardProps[] = [
  {
    label: 'Ventas',
    quantity: 200,
    color: COLORS_ENT.operationType.sell.hex,
    icon: ICONS.sales
  },
  {
    label: 'Compras',
    quantity: 200,
    color: COLORS_ENT.operationType.buy.hex,
    icon: ICONS.purchases
  }
]

type Props = {
  children: React.ReactNode
}

function TransactionsLayout ({ children }: Props) {
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
            <ListCardEntity items={itemsTransactions} />
          </div>
          <div className='flex-1 flex flex-col md:flex-row lg:flex-col gap-5 h-full'>
            <CardsTransactions />
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
      <div className='flex flex-col lg:flex-row lg:items-start gap-10'>
        <ListTransactions />
        <div className='w-full flex flex-col gap-2 items-center'>
          <TabTransactions />
          <br />
          {children}
        </div>
      </div>
    </>
  )
}
export default TransactionsLayout
