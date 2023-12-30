import CardGraphic from '@/components/CardGraphic'
import ListCardEntity from '@/components/ListCardEntity'
import ChartTransactions from '@/features/ChartTransactions'
import CardsTransactions from '@/modules/Transactions/components/CardsTransactions'
import ListTransactions from '@/modules/Transactions/components/ListTransactions'
import TabTransactions from '@/modules/Transactions/components/TabTransactions'
import { Divider } from '@nextui-org/react'
import React from 'react'

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
            <ListCardEntity items={['sales', 'purchases']} />
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
