/* eslint-disable react/jsx-closing-tag-location */
import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormSupplierEdit from '@/modules/Suppliers/components/FormSupplierEdit'
import getSupplierById from '@/modules/Suppliers/services/getSupplierById'

type Props = {
  params: { id: `${number}`}
}

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
    label: 'Editar proveedor'
  }
]

async function EditSupplierPage ({ params }: Props) {
  const { id } = params

  const supplier = await getSupplierById(id)

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      {
        supplier
          ? <div className='flex flex-col w-[min(100%,800px)]'>
            <h1 className='text-xl font-semibold'>Editar proveedor</h1>
            <p className='text'>Modifique la información del proveedor.</p>
            <br />
            <FormSupplierEdit supplier={supplier} />
          </div>
          : <p className='text-danger'>Proveedor no encontrado</p>
      }
    </>
  )
}
export default EditSupplierPage
