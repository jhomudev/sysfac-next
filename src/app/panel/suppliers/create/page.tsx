import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormSupplierCreate from '@/modules/Suppliers/components/FormSupplierCreate'

const breadcrumbItems:MyBreadcrumbItemProps[] = [
  {
    label: 'Home',
    route: ROUTES.panel
  },
  {
    label: 'Proveedores',
    route: ROUTES.suppliers
  },
  {
    label: 'Crear categoría'
  }
]

function CreateUserPage () {
  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Agregar proveedor</h1>
        <br />
        <FormSupplierCreate />
      </div>
    </>
  )
}
export default CreateUserPage
