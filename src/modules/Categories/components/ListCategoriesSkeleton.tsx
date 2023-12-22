'use client'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

function ListCategoriesSkeleton () {
  return (
    <>
      {
        Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} as='li' fullWidth>
            <CardHeader className='flex flex-col items-start gap-1'>
              <Skeleton className='w-2/5 rounded-lg'>
                <div className='h-3 w-full rounded-lg' />
              </Skeleton>
              <Skeleton className='w-4/5 rounded-lg'>
                <div className='h-3 w-full rounded-lg' />
              </Skeleton>
            </CardHeader>
            <CardBody>
              <Skeleton className='rounded-lg'>
                <div className='h-36 rounded-lg' />
              </Skeleton>
            </CardBody>
          </Card>
        ))
      }
    </>
  )
}
export default ListCategoriesSkeleton
