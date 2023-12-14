import React from 'react'
import ROUTES from '@/app/routes'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { Divider } from '@nextui-org/divider'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormUserEditData from '@/pages/Users/components/FormUserEditData'
import FormUserEditAccount from '@/pages/Users/components/FormUserEditAccount'
import FormUserChangePassword from '@/pages/Users/components/FormUserChangePassword'
import { ApiResponseWithReturn, UserFromDB } from '@/types'
import { formatUser } from '@/adapters'
import axios from 'axios'
import { API_URL } from '@/contants'

type Props = {
  params: Params
}

async function EditUserPage ({ params }: Props) {
  const { username } = params
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

  const res = await axios<ApiResponseWithReturn<UserFromDB>>(`${API_URL}/users/${username}`)
  const data = res.data.data
  const user = formatUser(data)

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
