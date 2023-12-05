import { Skeleton } from '@nextui-org/skeleton'

function loading () {
  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex flex-col gap-1'>
        <Skeleton className='w-[100px] h-6 mb-2 rounded-full' />
        <Skeleton className='w-full h-5 rounded-full' />
        <Skeleton className='w-full h-5 rounded-full' />
      </div>
      <br />
      <div className='flex justify-between items-center gap-2'>
        <Skeleton className='w-[min(100%,300px)] h-14 rounded-lg' />
        <Skeleton className='flex-1 rounded-lg w-[min(100%,100px)] h-14' />
      </div>
      <br />
      <Skeleton className='flex-1 rounded-lg' />
    </div>
  )
}
export default loading
