'use client'
import CardEntityDashboard from '@/components/CardEntityDashboard'
import CardGraphic from '@/components/CardGraphic'
import ChartTransactions from '@/features/ChartTransactions'
import TableTransactions from '@/features/TableTransactions'
import { NEXTUI_COLORS } from '@/libs/nextui'
import { CLASS_ICONS } from '@/libs/yesicon'
import { Divider } from '@nextui-org/react'
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

function TransactionsPage () {
  return (
    <div>
      <h1 className='text-2xl font-medium mb-3'>Transacciones</h1>
      <p className='text'>
        Obrserve y gestione las transacciones realizadas dentro el sistema, Tiene el control de las acciones sobre las ventas y compras,
        entradas y salidas de los productos.
      </p><br />
      <Divider />
      <br />
      <div className='flex gap-5 flex-col lg:flex-row'>
        <div className='w-full lg:min-w-[300px] lg:w-[min(100%,400px)] flex flex-col gap-5'>
          {
            itemsTransactions.map(item => (
              <CardEntityDashboard
                key={item.label}
                route='#'
                color={item.color}
                label={item.label}
                icon={item.icon}
                quantity={item.quantity}
              />
            ))
          }
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
      <TableTransactions />
    </div>
  )
}
export default TransactionsPage
