import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormLocationEdit from '@/pages/Locations/components/FormLocationEdit'
import { ELocationType, Location } from '@/types'
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

function EditLocationPage ({ params }: Props) {
  const { id } = params

  const location: Location = {
    id,
    name: 'Local 1',
    type: ELocationType.warehouse,
    address: 'Jr. Libertad',
    canStoreMore: true,
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  }

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
