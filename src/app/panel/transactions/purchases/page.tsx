import TablePurchases from '@/pages/Transactions/components/TablePurchases'
import { Purchase } from '@/types'

const purchases: Purchase[] = [
  {
    id: 1,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    user: {
      id: 1,
      username: 'pedro',
      fullname: 'Pedro'
    },
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    id: 2,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    user: {
      id: 1,
      username: 'pedro',
      fullname: 'Pedro'
    },
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    id: 3,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    user: {
      id: 1,
      username: 'pedro',
      fullname: 'Pedro'
    },
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  }
]
function PurchasesPage () {
  return (
    <>
      <TablePurchases purchases={purchases} />
    </>
  )
}
export default PurchasesPage
