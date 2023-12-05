'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { Transaction, EOperationType } from '@/types'
import getLeftTime from '@/utils/getLeftTime'
import { Card, CardHeader, Link, Listbox, ListboxItem } from '@nextui-org/react'

type Props = {
  transactions: Transaction[],
  showRedirect?: boolean
}

function ListTransactions ({ transactions, showRedirect = false }: Props) {
  return (
    <Card className='w-full lg:w-[min(100%,400px)] lg:min-w-[350px] p-5'>
      <CardHeader className='flex flex-col items-start'>
        <h2 className='title'>Movimientos recientes</h2>
        <p className='text'>Observe la ventas y compras más recientes realizadas por los usuarios en el sistema.</p>
      </CardHeader>
      <Card>
        <Listbox
          aria-label='transacciones recientes'
          variant='bordered'
          items={transactions}
          bottomContent={showRedirect && <Link className='text-xs mx-auto my-3' color='secondary' href={ROUTES.transactions}>Ver trasacciones</Link>}
        >
          {
            (item) => {
              const color = item.operationType === EOperationType.buy ? COLORS_ENT.operationType.buy.hex : COLORS_ENT.operationType.sell.hex
              const icon = item.operationType === EOperationType.buy ? 'material-symbols:shopping-cart-outline' : 'material-symbols:sell-outline'
              const link = `/panel/transactions/${item.operationType === EOperationType.buy ? 'purchases' : 'sales'}/${item.id}`
              return (
                <ListboxItem
                  key={item.id}
                  description={
                    <span className='flex items-center text'><Yesicon fontSize={15} icon={ICONS.time} />{getLeftTime(item.createdAt)}</span>
                    }
                  startContent={
                    <span
                      className='p-2 rounded-md' style={{
                        backgroundColor: color + '20',
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
                  href={link}
                >
                  {item.user.fullname}
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
