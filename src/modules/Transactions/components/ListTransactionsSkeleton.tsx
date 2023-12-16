'use client'

import { Skeleton } from '@nextui-org/react'

function ListTransactionsSkeleton () {
  return (
    <div className='w-full flex flex-col gap-3 p-3'>
      {
        Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='w-full flex gap-2'>
            <Skeleton className='w-12 h-10 rounded-md' />
            <div className='w-full flex flex-col gap-1 pt-1'>
              <Skeleton className='w-[30%] h-2 rounded-full' />
              <Skeleton className='w-full h-3 rounded-full' />
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default ListTransactionsSkeleton
