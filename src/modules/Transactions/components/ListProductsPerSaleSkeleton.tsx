'use client'

import { Card, CardBody, CardFooter, CardHeader, Skeleton } from '@nextui-org/react'

function ListProductsPerSaleSkeleton () {
  return Array.from({ length: 20 }).map((_, i) => (
    <Card key={i} as='li' fullWidth className='flex-1'>
      <CardHeader className='flex flex-col gap-1 items-center'>
        <Skeleton className='w-[80%] h-4 rounded-md' />
        <Skeleton className='w-[90%] h-3 rounded-md' />
      </CardHeader>
      <CardBody>
        <Skeleton className='w-full h-full min-h-[150px] rounded-md' />
      </CardBody>
      <CardFooter className='flex flex-col gap-1 items-start'>
        <Skeleton className='w-[50%] h-4 rounded-md' />
        <Skeleton className='w-full h-3 rounded-md' />
      </CardFooter>
    </Card>
  ))
}
export default ListProductsPerSaleSkeleton
