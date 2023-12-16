import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormProductEdit from '@/modules/Productos/componentes/FormProductsEdit'
import { getProductById } from '@/modules/Productos/services'

type Props = {
  params: {
    id: `${number}`
  }
}

async function EditProductPage ({ params }: Props) {
  const { id } = params
  const product = await getProductById(id)
  if (!product) return <p className='text-danger'>Producto no encontrado</p>

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
      label: product.name,
      route: `${ROUTES.products}/${id}`
    },
    {
      label: 'Editar producto'
    }
  ]

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Editar producto</h1>
        <br />
        <FormProductEdit product={product} />
      </div>
    </>
  )
}
export default EditProductPage
