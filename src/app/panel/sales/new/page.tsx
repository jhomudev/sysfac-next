import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import FiltersProductsPerSale from '@/pages/Transactions/components/FilterProductsPerSale'
import ListProductsPerSale from '@/pages/Transactions/components/ListProductsPerSale'
import { Divider, Input } from '@nextui-org/react'

const breadcrumbItems: MyBreadcrumbItemProps[] = [
  {
    label: 'Home',
    route: ROUTES.panel
  },
  {
    label: 'Transacciones',
    route: ROUTES.transactions
  },
  {
    label: 'Nueva venta'
  }
]

function NewSalePage () {
  return (
    <>
      <h1 className='title-main'>Nueva venta</h1>
      <Divider />
      <MyBreadcrumbs className='mt-2' items={breadcrumbItems} />
      <br />
      <h2 className='title'>Productos</h2>
      <p className='text'>Agregue productos al carrito de venta.</p>
      <br />
      <div className='flex flex-col md:flex-row justify-between gap-3'>
        <Input isClearable className='w-full md:max-w-md' startContent={<Yesicon icon={ICONS.search} />} placeholder='Buscar producto' />
        {/* <Button className='w-full md:w-min' color='warning' variant='ghost'>Ver carrito</Button> */}
      </div>
      <br />
      <FiltersProductsPerSale />
      <br />
      <ListProductsPerSale />
    </>
  )
}
export default NewSalePage
