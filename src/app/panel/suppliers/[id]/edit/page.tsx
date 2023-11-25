import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormSupplierEdit from '@/pages/Suppliers/components/FormSupplierEdit'
import { Supplier } from '@/types'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

type Props = {
  params: Params
}

const supplier: Supplier = {
  id: 4,
  ruc: '1345656767898',
  name: 'Proveedor 4',
  address: 'Jr. Peresz de Regollar',
  phone: '968230122',
  createdAt: '2023-11-09 10:03:07',
  updatedAt: '2023-11-09 10:03:07'
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

function EditSupplierPage ({ params }: Props) {
  const { id } = params

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Editar proveedor</h1>
        <p className='text'>Modifique la iformación del proveedor.{id}</p>
        <br />
        <FormSupplierEdit supplier={supplier} />
      </div>
    </>
  )
}
export default EditSupplierPage
