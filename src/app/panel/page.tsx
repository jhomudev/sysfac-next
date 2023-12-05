import ROUTES from '../routes'
import ChartTransactions from '@/features/ChartTransactions'
import ListTransactions from '@/features/ListTransactions'
import ChartStates from '@/features/ChartStates'
import ChartMoreSales from '@/features/ChartMoreSales'
import ListCardEntity from '@/components/ListCardEntity'
import CardGraphic from '@/components/CardGraphic'
import { CardEntityDashboardProps } from '@/components/CardEntityDashboard'
import { NEXTUI_COLORS } from '@/contants'
import { EOperationType, Transaction } from '@/types'

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

const transactions: Transaction[] = [
  {
    id: 1,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 2,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 3,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 4,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 5,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 6,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 7,
    operationType: EOperationType.buy,
    totalPay: 90.0,
    comments: 'A sample transaction',
    user: { id: 1, username: 'user1', fullname: 'Alice johnson' },
    createdAt: '2023-11-05 12:00:00'
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
            className='w-full p-4'
            title='Análisis de movimientos'
            description='El gráfico muestra las ventas y compras mensuales a lo largo del tiempo. Puede ver cómo las transacciones han variado mes a mes.'
          >
            <ChartTransactions />
          </CardGraphic>
          <ListTransactions transactions={transactions} showRedirect />
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
