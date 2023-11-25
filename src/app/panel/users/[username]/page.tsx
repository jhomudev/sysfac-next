import ROUTES from '@/app/routes'
// import { Chip } from '@nextui-org/chip'
// import { Link } from '@nextui-org/link'
// import { Card, CardBody, CardHeader } from '@nextui-org/card'
// import { Button, Tooltip } from '@nextui-org/react'
import { Card, CardBody, CardHeader, Chip, Link, Button, Tooltip } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { EOperationType, EProofType, EUserState, EUserType, Transaction, User } from '@/types'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import TableTransactionsPerUser from '@/pages/Users/components/TableTransactionsPerUser'

type Props = {
  params: Params
}

const data:Partial<Transaction>[] = [
  {
    id: 1,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    client: {
      id: 1,
      names: 'Jose',
      lastnames: 'de la Fuente',
      dni: '71728342'
    }
  },
  {
    id: 2,
    operationType: EOperationType.sell,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 1,
      name: 'Proveedor 1'
    },
    client: {
      id: 2,
      names: 'Yessica',
      lastnames: 'Morales',
      dni: '71728342'
    }
  },
  {
    id: 3,
    operationType: EOperationType.buy,
    proofType: EProofType.invoice,
    totalImport: 100,
    discount: 10,
    totalPay: 90,
    supplier: {
      id: 2,
      name: 'Proveedor 2'
    },
    client: {
      id: 1,
      names: 'Jose',
      lastnames: 'de la Fuente',
      dni: '71728342'
    }
  }
]
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
  const colorUserType = user.type === EUserType.admin
    ? COLORS_ENT.userType.admin.nextui
    : user.type === EUserType.seller ? COLORS_ENT.userType.seller.nextui : COLORS_ENT.userType.superadmin.nextui

  return (
    <div>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex items-center justify-between'>
        <h1 className='title-main'>Jhonan Caleb Muñoz Carrillo</h1>
        <Chip color={colorUserType} variant='shadow'>Administrador</Chip>
      </div>
      <small>{username}</small>
      <br /> <br />
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
              <dd className='text'>Jhonan Muñoz</dd>
            </dl>
            <dl className='mb-3'>
              <dt>Apellidos</dt>
              <dd className='text'>Jhonan Muñoz</dd>
            </dl>
            <dl className='mb-3'>
              <dt>Correo</dt>
              <dd><Link size='sm' href='mailto:jhonna@gmail.com'>jhonna@gmail.com</Link></dd>
            </dl>
            <dl className='mb-3'>
              <dt>Teléfono</dt>
              <dd className='text'><Link size='sm' href='tel:+51993884118'>993884118</Link></dd>
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
              <dd className='text'>jhonanmuñoz</dd>
            </dl>
            <dl className='mb-3'>
              <dt>Tipo de usuario</dt>
              <dd className='text'><Chip size='sm'>Admin</Chip></dd>
            </dl>
            <dl className='mb-3'>
              <dt>Estado</dt>
              <dd className='text'><Chip size='sm'>Activo</Chip></dd>
            </dl>
            <dl className='mb-3'>
              <dt>Contraseña de cuenta</dt>
              <dd className='text'>*********</dd>
            </dl>
          </CardBody>
        </Card>
      </div>
      <br />
      <h2 className='title'>Movimientos</h2>
      <p className='text'>Observe los movimientos que realizó el usuario hast ala fecha actual dentro del sistema.</p><br />
      <TableTransactionsPerUser data={data} />
    </div>
  )
}
export default UserPage
