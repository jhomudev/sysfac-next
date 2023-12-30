'use client'
import ROUTES from '@/app/routes'
import { ICONS, NEXTUI_COLORS } from '@/contants'
import { useClient } from '@/modules/Clients/hooks'
import { useProduct } from '@/modules/Productos/hooks'
import { usePurchase, useSale, useTransaction } from '@/modules/Transactions/hooks'
import { useUser } from '@/modules/Users/hooks'
import CardEntityDashboard, { CardEntityDashboardProps } from './CardEntityDashboard'

type Props = {
  items: ('users' | 'clients' | 'products' | 'transactions' | 'sales' | 'purchases')[]
}
function ListCardEntity ({ items }: Props) {
  const { dataProducts } = useProduct()
  const { dataUsers } = useUser()
  const { dataClients } = useClient()
  const { dataTransactions } = useTransaction()
  const { dataSales } = useSale()
  const { dataPurchases } = usePurchase()

  const dashboardItems: CardEntityDashboardProps[] = [
    {
      id: 'products',
      route: ROUTES.products,
      label: 'Products',
      quantity: dataProducts.data?.meta?.totalRows || 0,
      color: NEXTUI_COLORS.danger,
      icon: ICONS.products
    },
    {
      id: 'transactions',
      route: ROUTES.transactions,
      label: 'Transacciones',
      quantity: dataTransactions.data?.meta?.totalRows || 0,
      color: NEXTUI_COLORS.success,
      icon: ICONS.transactions
    },
    {
      id: 'users',
      route: ROUTES.users,
      label: 'Usuarios',
      quantity: dataUsers.data?.meta?.totalRows || 0,
      color: NEXTUI_COLORS.warning,
      icon: ICONS.user
    },
    {
      id: 'clients',
      route: ROUTES.clients,
      label: 'Clientes',
      quantity: dataClients.data?.meta?.totalRows || 0,
      color: NEXTUI_COLORS.secondary,
      icon: ICONS.clients
    },
    {
      id: 'sales',
      route: ROUTES.transactions + '/sales',
      label: 'Ventas',
      quantity: dataSales.data?.meta?.totalRows || 0,
      color: NEXTUI_COLORS.danger,
      icon: ICONS.sales
    },
    {
      id: 'purchases',
      route: ROUTES.transactions + '/purchases',
      label: 'Compras',
      quantity: dataPurchases.data?.meta?.totalRows || 0,
      color: NEXTUI_COLORS.success,
      icon: ICONS.purchases
    }
  ]

  return (
    <>
      {
        dashboardItems.map(item => {
          if (items.includes(item.id)) {
            return <CardEntityDashboard key={item.id} {...item} />
          }
          return null
        })
      }
    </>
  )
}
export default ListCardEntity
