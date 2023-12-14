'use client'
import { Card, Skeleton } from '@nextui-org/react'

function CategoriesSkeleton () {
  return (
    <>
      {
        Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className='w-full space-y-5 p-4' radius='lg'>
            <div className='space-y-3'>
              <Skeleton isLoaded className='w-2/5 rounded-lg'>
                <div className='h-3 w-full rounded-lg bg-default-200' />
              </Skeleton>
              <Skeleton isLoaded className='w-4/5 rounded-lg'>
                <div className='h-3 w-full rounded-lg bg-default-300' />
              </Skeleton>
            </div>
            <Skeleton isLoaded className='rounded-lg'>
              <div className='h-36 rounded-lg bg-default' />
            </Skeleton>
          </Card>
        ))
      }
    </>
  )
}
export default CategoriesSkeleton
