import TableSales from '@/pages/Transactions/components/TableSales'
import { EProofType, Sale } from '@/types'

const sales:Sale[] = [
  {
    id: 1,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    client: {
      id: 1,
      fullname: 'Jose de la Fuente',
      dni: '71728342'
    },
    user: {
      id: 1,
      username: 'pedro',
      fullname: 'Pedro de la cruz'
    },
    proofCode: 'DW3443',
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    id: 2,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    client: {
      id: 2,
      fullname: 'Yessica',
      dni: '71728342'
    },
    user: {
      id: 2,
      username: 'pedro',
      fullname: 'Pedro'
    },
    proofCode: 'DW3443',
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  },
  {
    id: 3,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    client: {
      id: 1,
      fullname: 'Jose',
      dni: '71728342'
    },
    user: {
      id: 1,
      username: 'pedro',
      fullname: 'Pedro'
    },
    proofCode: 'DW3443',
    comments: 'etc',
    createdAt: '2023-11-09 10:03:07'
  }
]

function SalesPage () {
  return (
    <>
      <TableSales sales={sales} />
    </>
  )
}
export default SalesPage
