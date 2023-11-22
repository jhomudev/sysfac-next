'use client'
import CardEntityDashboard, { CardEntityDashboardProps } from '@/components/CardEntityDashboard'
import ROUTES from '../routes'
import CardGraphic from '@/components/CardGraphic'
import { NEXTUI_COLORS } from '@/libs/nextui'
import ListTransactions from '@/features/ListTransactions'
import ChartTransactions from '@/features/ChartTransactions'
import ChartMoreSales from '@/features/ChartMoreSales'
import ChartStates from '@/features/ChartStates'

const dashboardItems: CardEntityDashboardProps[] = [
  {
    route: ROUTES.products,
    label: 'Products',
    quantity: 200,
    color: NEXTUI_COLORS.danger,
    icon: 'system-uicons:box-open'
  },
  {
    route: ROUTES.transactions,
    label: 'Transacciones',
    quantity: 200,
    color: NEXTUI_COLORS.success,
    icon: 'ri:exchange-cny-line'
  },
  {
    route: ROUTES.users,
    label: 'Usuarios',
    quantity: 10,
    color: NEXTUI_COLORS.warning,
    icon: 'material-symbols:manage-accounts-outline'
  },
  {
    route: ROUTES.clients,
    label: 'Clientes',
    quantity: 100,
    color: NEXTUI_COLORS.secondary,
    icon: 'fluent:people-28-regular'
  }
]

function DashboardPage () {
  return (
    <>
      <h1 className='title-main'>Dashboard</h1>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap gap-5'>
          {
            dashboardItems.map(item => (
              <CardEntityDashboard key={item.label} {...item} />
            ))
          }
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <CardGraphic
            className='w-full p-4'
            title='Análisis de movimientos'
            description='El gráfico muestra las ventas y compras mensuales a lo largo del tiempo. Puede ver cómo las transacciones han variado mes a mes.'
          >
            <ChartTransactions />
          </CardGraphic>
          <ListTransactions />
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <CardGraphic
            className='w-full lg:w-[35%] p-4'
            title='Gráfico por estados'
            description='Observa la cantidad de productos correspondiente a cada estado'
          >
            <ChartStates />
          </CardGraphic>
          <CardGraphic
            className='w-full lg:w-[65%] p-4'
            title='Productos más vendidos'
            description='Verifique los productos más con más ventas.'
          >
            <ChartMoreSales />
          </CardGraphic>
        </div>
      </div>
    </>
  )
}
export default DashboardPage
