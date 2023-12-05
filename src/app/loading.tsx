import { Spinner } from '@nextui-org/spinner'

function loading () {
  return (
    <div className='w-full h-screen grid place-items-center'>
      <Spinner />
    </div>
  )
}
export default loading
