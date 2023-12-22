'use client'
import ROUTES from '@/app/routes'
import { logo } from '@/assets'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Button, Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    label: 'Dashboard',
    route: ROUTES.panel,
    icon: ICONS.dashboard
  },
  {
    label: 'Usuarios',
    route: ROUTES.users,
    icon: ICONS.users
  },
  {
    label: 'Clientes',
    route: ROUTES.clients,
    icon: ICONS.clients
  },
  {
    label: 'Categorias',
    route: ROUTES.categories,
    icon: ICONS.categories
  },
  {
    label: 'Productos',
    route: ROUTES.products,
    icon: ICONS.products
  },
  {
    label: 'Transacciones',
    route: ROUTES.transactions,
    icon: ICONS.transactions
  },
  {
    label: 'Proveedores',
    route: ROUTES.suppliers,
    icon: ICONS.suppliers
  },
  {
    label: 'Locales',
    route: ROUTES.locations,
    icon: ICONS.locations
  }
]

function MenuBar () {
  const pathname = usePathname()
  return (
    <Card className='w-full h-full p-5'>
      <CardHeader style={{ margin: '2rem auto', width: 'min(100%,150px)' }}>
        <Image className='object-cover w-full h-full' src={logo} alt='logo sysfac' />
      </CardHeader>
      <CardBody>
        <nav>
          <ul className='flex flex-col gap-3'>
            {
              menuItems.map((item) => (
                <li key={item.label}>
                  <Button
                    className='flex gap-3 justify-start'
                    variant={pathname === item.route ? 'shadow' : 'light'}
                    color='primary'
                    fullWidth
                    startContent={<Yesicon fontSize={20} icon={item.icon} />}
                    as={Link}
                    href={item.route}
                  >
                    {item.label}
                  </Button>
                </li>
              ))
            }
            <Divider />
            <li>
              <Button
                onPress={() => signOut()}
                className='flex gap-3 justify-start'
                color='danger'
                variant='light'
                fullWidth
                startContent={<Yesicon icon={ICONS.logout} />}
              >Cerrar sesión
              </Button>
            </li>
          </ul>
        </nav>
      </CardBody>
    </Card>
  )
}
export default MenuBar
