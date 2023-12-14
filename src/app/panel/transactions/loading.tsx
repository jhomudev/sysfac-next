import { Skeleton } from '@nextui-org/skeleton'

function loading () {
  return (
    <div className='w-full flex-1 flex flex-col'>
      <div className='flex justify-between items-center gap-2'>
        <Skeleton className='w-full max-w-sm h-14 rounded-lg' />
        <Skeleton className='rounded-lg w-[min(100%,130px)] h-12' />
      </div>
      <br />
      <Skeleton className='flex-1 rounded-lg min-h-[400px]' />
    </div>
  )
}
export default loading
