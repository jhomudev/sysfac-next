import React from 'react'
import ROUTES from '@/app/routes'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { Divider } from '@nextui-org/divider'
import { FormUserChangePassword, FormUserEditAccount, FormUserEditData } from '@/pages/Users/components'
import { MyBreadcrumbs } from '@/components'
import { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'

type Props = {
  params: Params
}

function EditUserPage ({ params }: Props) {
  const { username } = params
  // const [isVisible, setIsVisible] = React.useState<boolean>(false)

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
      label: username,
      route: `${ROUTES.users}/${username}`
    },
    {
      label: 'Editar información'
    }
  ]

  return (
    <div className='w-[min(100%,900px)]'>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <strong className='title'>Editar usuario</strong>
      <h1 className='text-xl font-semibold text-secondary'>Jhonan caleb Muñoz</h1>
      <br />
      <Divider />
      <br />
      <FormUserEditData />
      <br /><br />
      <FormUserEditAccount />
      <br /><br />
      <FormUserChangePassword />
    </div>
  )
}
export default EditUserPage
