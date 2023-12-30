import { CardEntityDashboardProps } from '@/components/CardEntityDashboard'
import CardGraphic from '@/components/CardGraphic'
import ListCardEntity from '@/components/ListCardEntity'
import { NEXTUI_COLORS } from '@/contants'
import ChartMoreSales from '@/features/ChartMoreSales'
import ChartStates from '@/features/ChartStates'
import ChartTransactions from '@/features/ChartTransactions'
import ListTransactions from '@/modules/Transactions/components/ListTransactions'
import ROUTES from '../routes'

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
          <ListCardEntity items={dashboardItems} />
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <CardGraphic
            className='w-full p-4 max-h-[500px] xl:max-h-[588px]'
            title='Análisis de movimientos'
            description='El gráfico muestra las ventas y compras mensuales a lo largo del tiempo. Puede ver cómo las transacciones han variado mes a mes.'
          >
            <ChartTransactions />
          </CardGraphic>
          <ListTransactions showRedirect />
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <CardGraphic
            className='w-full lg:w-[35%] p-4 max-h-[588px]'
            title='Gráfico por estados'
            description='Observa la cantidad de productos correspondiente a cada estado'
          >
            <ChartStates />
          </CardGraphic>
          <CardGraphic
            className='w-full lg:w-[65%] p-4 max-h-[588px]'
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
