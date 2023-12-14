/* eslint-disable react/jsx-indent */
'use client'
import { formatTransaction } from '@/adapters'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { fetcher } from '@/libs/swr'
import ListTransactionsSkeleton from '@/pages/Transactions/components/ListTransactionsSkeleton'
import { ApiResponseWithReturn, EOperationType, TransactionResponse } from '@/types'
import getLeftTime from '@/types/utils/getLeftTime'
import { Card, CardHeader, Link, Listbox, ListboxItem } from '@nextui-org/react'
import React from 'react'
import useSWR from 'swr'

type Props = {
  showRedirect?: boolean
}

function ListTransactions ({ showRedirect = false }: Props) {
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<TransactionResponse[]>>('/api/transactions', fetcher, {
    keepPreviousData: true
  })

  if (error) console.log('ocurrió un error:', error)
  const transactions = React.useMemo(() => data?.data?.map(t => formatTransaction(t)) || [], [data])

  return (
    <Card className='w-full lg:w-[min(100%,400px)] lg:min-w-[350px] p-5'>
      <CardHeader className='flex flex-col items-start'>
        <h2 className='title'>Movimientos recientes</h2>
        <p className='text'>Observe la ventas y compras más recientes realizadas por los usuarios en el sistema.</p>
      </CardHeader>
      <Card>
        {
          isLoading
            ? <ListTransactionsSkeleton />
            : <Listbox
                aria-label='transacciones recientes'
                emptyContent='No hay movimientos'
                classNames={{
                  list: 'max-h-[500px] overflow-auto'
                }}
                variant='bordered'
                items={transactions}
                bottomContent={showRedirect && <Link className='text-xs mx-auto my-3' color='secondary' href={ROUTES.transactions}>Ver trasacciones</Link>}
              >
                {
                (item) => {
                  const color = item.operationType === EOperationType.buy ? COLORS_ENT.operationType.buy.hex : COLORS_ENT.operationType.sell.hex
                  const icon = item.operationType === EOperationType.buy ? 'material-symbols:shopping-cart-outline' : 'material-symbols:sell-outline'
                  const link = `${item.operationType === EOperationType.buy ? ROUTES.purchases : ROUTES.sales}/${item.id}`
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
        }
      </Card>
    </Card>
  )
}
export default ListTransactions
