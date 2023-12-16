'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Tab, Tabs } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function TabTransactions () {
  const pathname = usePathname()
  const { replace } = useRouter()

  const keys = [`${ROUTES.transactions}/sales`, `${ROUTES.transactions}/purchases`]
  const isKeyInPathname = keys.includes(pathname || '')

  const handleChangeTab = (key: React.Key) => {
    if (keys.includes(key as string)) replace(key as string)
  }

  return (
    <>
      <Tabs
        disabledKeys={['-']}
        aria-label='Transacciones' color='primary' selectedKey={isKeyInPathname ? pathname : '-'} onSelectionChange={handleChangeTab}
      >
        <Tab
          key={`${ROUTES.transactions}/sales`}
          title={
            <div className='flex gap-2 items-center'>
              <Yesicon icon={ICONS.sales} />
              <span>Ventas</span>
            </div>
          }
        />
        <Tab
          key='-'
          title='|'
        />
        <Tab
          key={`${ROUTES.transactions}/purchases`}
          title={
            <div className='flex gap-2 items-center'>
              <Yesicon icon={ICONS.purchases} />
              <span>Compras</span>
            </div>
          }
        />
      </Tabs>
    </>
  )
}
export default TabTransactions
