import ROUTES from '@/app/routes'
import { MyBreadcrumbs } from '@/components'
import { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import { FormUserCreate } from '@/pages/Users/components'

function CreateUserPage () {
  const breadcrumbItems:MyBreadcrumbItemProps[] = [
    {
      label: 'Home',
      route: ROUTES.panel
    },
    {
      label: 'Usuarios',
      route: ROUTES.users
    },
    {
      label: 'Crear usuario'
    }
  ]

  return (
    <div className='w-[min(100%,900px)]'>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <h1 className='text-xl font-semibold text-secondary'>Crear nuevo usuario</h1>
      <br />
      <FormUserCreate />
    </div>
  )
}
export default CreateUserPage
