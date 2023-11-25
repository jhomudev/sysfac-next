import ROUTES from '../routes'
import ChartTransactions from '@/features/ChartTransactions'
import ListTransactions from '@/features/ListTransactions'
import ChartStates from '@/features/ChartStates'
import ChartMoreSales from '@/features/ChartMoreSales'
import ListCardEntity from '@/components/ListCardEntity'
import CardGraphic from '@/components/CardGraphic'
import { CardEntityDashboardProps } from '@/components/CardEntityDashboard'
import { NEXTUI_COLORS } from '@/contants'
import { EOperationType, EProofType, Transaction } from '@/types'

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
    proofType: EProofType.ticket,
    proofCode: 'INV123',
    totalImport: 100.0,
    discount: 10.0,
    totalPay: 90.0,
    comments: 'A sample transaction',
    supplier: { id: 1, name: 'Supplier 1' },
    client: { id: 1, dni: '1234567890', names: 'John', lastnames: 'Doe' },
    user: { id: 1, username: 'user1', names: 'Alice', lastnames: 'Johnson' },
    createdAt: '2023-11-05 12:00:00'
  },
  {
    id: 2,
    operationType: EOperationType.sell,
    proofType: EProofType.ticket,
    proofCode: 'RCPT456',
    totalImport: 50.0,
    discount: 5.0,
    totalPay: 45.0,
    comments: 'Another example transaction',
    supplier: { id: 2, name: 'Supplier 2' },
    client: { id: 2, dni: '0987654321', names: 'Jane', lastnames: 'Smith' },
    user: { id: 2, username: 'user2', names: 'Bob', lastnames: 'Williams' },
    createdAt: '2023-11-05 13:30:00'
  },
  {
    id: 3,
    operationType: EOperationType.sell,
    proofType: EProofType.ticket,
    proofCode: 'INV456',
    totalImport: 75.0,
    discount: 7.5,
    totalPay: 67.5,
    comments: 'Third transaction',
    supplier: { id: 3, name: 'Supplier 3' },
    client: { id: 3, dni: '1357924680', names: 'Sarah', lastnames: 'Miller' },
    user: { id: 3, username: 'user3', names: 'Charlie', lastnames: 'Davis' },
    createdAt: '2023-11-06 10:15:00'
  },
  {
    id: 4,
    operationType: EOperationType.sell,
    proofType: EProofType.ticket,
    proofCode: 'RCPT789',
    totalImport: 60.0,
    discount: 6.0,
    totalPay: 54.0,
    comments: 'Fourth example',
    supplier: { id: 4, name: 'Supplier 4' },
    client: { id: 4, dni: '9876543210', names: 'Michael', lastnames: 'Brown' },
    user: { id: 4, username: 'user4', names: 'David', lastnames: 'Lee' },
    createdAt: '2023-11-07 14:20:00'
  },
  {
    id: 5,
    operationType: EOperationType.buy,
    proofType: EProofType.ticket,
    proofCode: 'INV789',
    totalImport: 120.0,
    discount: 12.0,
    totalPay: 108.0,
    comments: 'Fifth transaction',
    supplier: { id: 5, name: 'Supplier 5' },
    client: { id: 5, dni: '5432109876', names: 'Emily', lastnames: 'Anderson' },
    user: { id: 5, username: 'user5', names: 'Olivia', lastnames: 'Martin' },
    createdAt: '2023-11-08 16:45:00'
  },
  {
    id: 6,
    operationType: EOperationType.buy,
    proofType: EProofType.ticket,
    proofCode: 'INV789',
    totalImport: 120.0,
    discount: 12.0,
    totalPay: 108.0,
    comments: 'Fifth transaction',
    supplier: { id: 5, name: 'Supplier 5' },
    client: { id: 5, dni: '5432109876', names: 'Emily', lastnames: 'Anderson' },
    user: { id: 5, username: 'user5', names: 'Olivia', lastnames: 'Martin' },
    createdAt: '2023-11-08 16:45:00'
  },
  {
    id: 7,
    operationType: EOperationType.sell,
    proofType: EProofType.ticket,
    proofCode: 'INV789',
    totalImport: 120.0,
    discount: 12.0,
    totalPay: 108.0,
    comments: 'Fifth transaction',
    supplier: { id: 5, name: 'Supplier 5' },
    client: { id: 5, dni: '5432109876', names: 'Emily', lastnames: 'Anderson' },
    user: { id: 5, username: 'user5', names: 'Olivia', lastnames: 'Martin' },
    createdAt: '2023-11-08 16:45:00'
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
          <ListTransactions transactions={transactions} />
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
