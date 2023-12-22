import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormProductCreate from '@/modules/Productos/componentes/FormProductCreate'

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
    label: 'Agregar local'
  }
]

function CreateProductPage () {
  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Crear producto</h1>
        <br />
        <FormProductCreate />
      </div>
    </>
  )
}
export default CreateProductPage
