import React from 'react'
import ROUTES from '@/app/routes'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { Divider } from '@nextui-org/divider'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormUserEditData from '@/pages/Users/components/FormUserEditData'
import FormUserEditAccount from '@/pages/Users/components/FormUserEditAccount'
import FormUserChangePassword from '@/pages/Users/components/FormUserChangePassword'
import { EUserState, EUserType, User } from '@/types'

type Props = {
  params: Params
}

function EditUserPage ({ params }: Props) {
  const { username } = params
  const user:User = {
    id: 1,
    username: 'usuario1',
    names: 'Juan',
    lastnames: 'Perez',
    type: EUserType.admin,
    email: 'juan.perez@email.com',
    phone: '123456789',
    password: 'asdfsdf',
    state: EUserState.active,
    createdAt: '',
    updatedAt: ''
  }

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
      <h1 className='text-xl font-semibold text-secondary mb-3'>{user.names} {user.lastnames}</h1>
      <Divider />
      <br />
      <FormUserEditData user={user} />
      <br /><br />
      <FormUserEditAccount user={user} />
      <br /><br />
      <FormUserChangePassword user={user} />
    </div>
  )
}
export default EditUserPage
