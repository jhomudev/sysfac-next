import { formatUser } from '@/adapters'
import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon from '@/components/Yesicon'
import { API_URL, COLORS_ENT, ICONS } from '@/contants'
import { ApiResponseWithReturn, EUserState, EUserType, UserFromDB } from '@/types'
import { formatDate } from '@/utils'
import { Button, Card, CardBody, CardHeader, Chip, Link, Tooltip } from '@nextui-org/react'
import axios from 'axios'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

type Props = {
  params: Params
}

async function UserPage ({ params }: Props) {
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
      label: username
    }
  ]
  const res = await axios<ApiResponseWithReturn<UserFromDB>>(`${API_URL}/users/${username}`)
  const data = res.data.data
  const user = formatUser(data)

  const colorUserType = user.type === EUserType.admin
    ? COLORS_ENT.userType.admin.nextui
    : user.type === EUserType.seller ? COLORS_ENT.userType.seller.nextui : COLORS_ENT.userType.superadmin.nextui
  const colorUserState = user.state === EUserState.active ? COLORS_ENT.userState.active.nextui : COLORS_ENT.userState.inactive.nextui

  return (
    <div>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex items-center justify-between'>
        <h1 className='title-main'>{user.names} {user.lastnames}</h1>
        <Chip color={colorUserType} variant='shadow'>{user.type}</Chip>
      </div>
      <p className='text'>Creado el {formatDate(user.createdAt).dateLetter}</p>
      <p className='text'>Ultima edición : {user.updatedAt === user.createdAt ? 'Sin modificaciones' : formatDate(user.updatedAt).dateLetter}</p>
      <br />
      <div className='flex gap-5 flex-wrap'>
        <Card className='flex-[1_0_300px] p-4'>
          <CardHeader className='flex justify-between items-center'>
            <h2 className='title !text-secondary mb-0'>Información personal</h2>
            <Tooltip content='Editar'>
              <Button
                className='text-default hover:text-myDark'
                variant='light'
                isIconOnly
                as={Link}
                href={`${ROUTES.users}/${username}/edit#personal`}
              >
                <Yesicon fontSize={20} icon={ICONS.edit} />
              </Button>
            </Tooltip>
          </CardHeader>
          <CardBody>
            <dl className='mb-3'>
              <dt>Nombres</dt>
              <dd className='text'>{user.names}</dd>
            </dl>
            <dl className='mb-3'>
              <dt>Apellidos</dt>
              <dd className='text'>{user.lastnames}</dd>
            </dl>
            <dl className='mb-3'>
              <dt>Correo</dt>
              <dd><Link size='sm' href='mailto:jhonna@gmail.com'>{user.email}</Link></dd>
            </dl>
            <dl className='mb-3'>
              <dt>Teléfono</dt>
              <dd className='text'><Link size='sm' href={`tel:+51${user.phone}`}>{user.phone}</Link></dd>
            </dl>
          </CardBody>
        </Card>
        <Card className='flex-[1_0_300px] p-4'>
          <CardHeader className='flex justify-between items-center'>
            <h2 className='title !text-secondary mb-0'>Información de cuenta</h2>
            <Tooltip content='Editar'>
              <Button
                className='text-default hover:text-myDark'
                variant='light'
                isIconOnly
                as={Link}
                href={`${ROUTES.users}/${username}/edit#account`}
              >
                <Yesicon fontSize={20} icon={ICONS.edit} />
              </Button>
            </Tooltip>
          </CardHeader>
          <CardBody>
            <dl className='mb-3'>
              <dt>Nombre de usuario</dt>
              <dd className='text'>{user.username}</dd>
            </dl>
            <dl className='mb-3'>
              <dt>Tipo de usuario</dt>
              <dd className='text'><Chip size='sm' color={colorUserType}>{user.type}</Chip></dd>
            </dl>
            <dl className='mb-3'>
              <dt>Estado</dt>
              <dd className='text'><Chip size='sm' variant='dot' color={colorUserState}>{user.state}</Chip></dd>
            </dl>
            <dl className='mb-3'>
              <dt>Contraseña de cuenta</dt>
              <dd className='text'>*********</dd>
            </dl>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default UserPage
