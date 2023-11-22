import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormUserCreate from '@/features/FormUserCreate'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

type Props = {
  params: Params
}
function CreateUserPage ({ params }:Props) {
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
