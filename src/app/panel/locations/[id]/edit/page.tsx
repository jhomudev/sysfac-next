import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormLocationEdit from '@/pages/Locations/components/FormLocationEdit'
import getLocationById from '@/pages/Locations/services/getLocationById'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

const breadcrumbItems:MyBreadcrumbItemProps[] = [
  {
    label: 'Home',
    route: ROUTES.panel
  },
  {
    label: 'Locales',
    route: ROUTES.locations
  },
  {
    label: 'Editar local'
  }
]

type Props = {
  params: Params
}

async function EditLocationPage ({ params }: Props) {
  const { id } = params
  const location = await getLocationById(id)
  if (!location) return <p className='text-danger'>Local no encontrado</p>

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Editar local</h1>
        <br />
        <FormLocationEdit location={location} />
      </div>
    </>
  )
}
export default EditLocationPage
