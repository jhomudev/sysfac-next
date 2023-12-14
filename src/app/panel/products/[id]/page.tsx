import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import { COLORS_ENT } from '@/contants'
import { getProductById } from '@/pages/Productos/services'
import { ESaleFor, EStateProduct } from '@/types'
import { formatDate } from '@/utils'
import { Button, Chip, Image, Link } from '@nextui-org/react'

type Props = {
  params: {
    id: `${number}`
  }
}

async function ProductPage ({ params }: Props) {
  const { id } = params

  const product = await getProductById(id)
  if (!product) return <p className='text-danger'>Producto no encontrado</p>

  const state = product.isActive ? EStateProduct.active : EStateProduct.inactive

  const breadcrumbItems:MyBreadcrumbItemProps[] = [
    {
      label: 'Home',
      route: ROUTES.panel
    },
    {
      label: 'Productos',
      route: ROUTES.products
    },
    {
      label: product.name
    }
  ]

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold uppercase'>{product.name}</h1>
          <Button as={Link} href={`${ROUTES.products}/${id}/edit`} size='sm' variant='ghost' color='secondary'>Editar producto</Button>
        </div>
        <br />
        <Image className='w-[min(100%,200px)] inline-block' src={product.image || 'https://unavatar.io/pikachu'} alt='product img' />
        <h2 className='title mt-2'>Información del producto</h2>
        <div className='flex gap-5 flex-wrap'>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Categoría</h3>
            <p className='text'>{product.category.name}</p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Mínimo en inventario</h3>
            <p className='text'>{product.inventaryMin}</p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Precio de venta</h3>
            <p className='text'>S/{product.priceSale}</p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Unidad de venta</h3>
            <p className='text'>{product.unit}</p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Venta por:</h3>
            <p className='text'>
              <Chip color={product.saleFor === ESaleFor.quantity ? COLORS_ENT.saleFor.quantity.nextui : COLORS_ENT.saleFor.unit.nextui} variant='flat'>{product.saleFor}</Chip>
            </p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Estado:</h3>
            <p className='text'>
              <Chip color={product.isActive ? COLORS_ENT.stateProduct.active.nextui : COLORS_ENT.stateProduct.inactive.nextui} variant='dot'>{state}</Chip>
            </p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Fecha de agragación:</h3>
            <p className='text'>{formatDate(product.createdAt).dateLetter}</p>
          </div>
          <div className='flex-[1_0_200px]'>
            <h3 className='text-base font-medium'>Última modificación:</h3>
            <p className='text'>{product.createdAt !== product.updatedAt ? formatDate(product.updatedAt).dateLetter : 'Sin modificaciones'}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProductPage
