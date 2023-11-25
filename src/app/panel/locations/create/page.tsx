import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormLocationCreate from '@/pages/Locations/components/FormLocationCreate'

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
    label: 'Agregar local'
  }
]

function CreateLocationPage () {
  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Agregar local</h1>
        <br />
        <FormLocationCreate />
      </div>
    </>
  )
}
export default CreateLocationPage
