import { marketingSvg } from '@/assets'
import { Image } from '@nextui-org/image'

function TransactionsPage () {
  return (
    <>
      <div
        className='flex flex-col items-center'
      >
        <h2 className='w-full text text-center'>Observa las transacciones, ventas o compras realizadas en el sistema</h2>
        <Image
          className='w-[min(100%,300px)]'
          src={marketingSvg.src}
          alt='img'
        />
      </div>
    </>
  )
}
export default TransactionsPage
