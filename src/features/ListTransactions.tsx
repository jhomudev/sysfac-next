'use client'
import ROUTES from '@/app/routes'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { NEXTUI_COLORS } from '@/libs/nextui'
import { getRelativeTime } from '@/libs/utils/date'
import { EOperationType, EProofType } from '@/types/enumDB'
// import { TTransactions } from '@/types/types'
import { Card, CardHeader, Link, Listbox, ListboxItem } from '@nextui-org/react'

// type Props = {
//   transactions: TTransactions[]
// }

const transactions = [
  {
    transactionId: 1,
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
    transactionId: 2,
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
    transactionId: 3,
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
    transactionId: 4,
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
    transactionId: 5,
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
    transactionId: 6,
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
    transactionId: 7,
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

function ListTransactions (/* { transactions }: Props */) {
  return (
    <Card className='w-full lg:w-[min(100%,400px)] lg:min-w-[350px] p-5'>
      <CardHeader className='flex flex-col items-start'>
        <h2 className='title'>Movimientos recientes</h2>
        <p className='text'>Observe la ventas y compras más recientes realizadas por los usuarios en el sistema.</p>
      </CardHeader>
      <Card>
        <Listbox
          variant='bordered'
          items={transactions}
          bottomContent={<Link className='text-xs mx-auto my-3' color='secondary' href={ROUTES.transactions}>Ver trasacciones</Link>}
        >
          {
            (item) => {
              const colorBorder = `${item.operationType === EOperationType.buy ? NEXTUI_COLORS.danger : NEXTUI_COLORS.success}20`
              const color = `${item.operationType === EOperationType.buy ? NEXTUI_COLORS.danger : NEXTUI_COLORS.success}`
              const icon = item.operationType === EOperationType.buy ? 'material-symbols:shopping-cart-outline' : 'material-symbols:sell-outline'
              return (
                <ListboxItem
                  key={item.transactionId}
                  description={
                    <span className='flex items-center text'><Yesicon fontSize={15} icon={CLASS_ICONS.time} />{getRelativeTime(item.createdAt)}</span>
                    }
                  startContent={
                    <span
                      className='p-2 rounded-md' style={{
                        backgroundColor: colorBorder,
                        border: `1px solid ${color}`
                      }}
                    >
                      <Yesicon
                        color={color}
                        fontSize={20}
                        icon={icon}
                      />
                    </span>
                    }
                  href={`/panel/transactions/${item.transactionId}`}
                >
                  {item.user.names.concat(` ${item.user.lastnames}`)}
                </ListboxItem>
              )
            }
          }
        </Listbox>
      </Card>
    </Card>
  )
}
export default ListTransactions
