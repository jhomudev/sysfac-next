'use client'
import ROUTES from '@/app/routes'
import { logo } from '@/assets'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { Button, Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    label: 'Dashboard',
    route: ROUTES.panel,
    icon: CLASS_ICONS.dashboard
  },
  {
    label: 'Usuarios',
    route: ROUTES.users,
    icon: CLASS_ICONS.users
  },
  {
    label: 'Clientes',
    route: ROUTES.clients,
    icon: CLASS_ICONS.clients
  },
  {
    label: 'Productos',
    route: ROUTES.products,
    icon: CLASS_ICONS.products
  },
  {
    label: 'Categorias',
    route: ROUTES.categories,
    icon: CLASS_ICONS.categories
  },
  {
    label: 'Transacciones',
    route: ROUTES.transactions,
    icon: CLASS_ICONS.transactions
  },
  {
    label: 'Proveedores',
    route: ROUTES.suppliers,
    icon: CLASS_ICONS.suppliers
  },
  {
    label: 'Locales',
    route: ROUTES.locations,
    icon: CLASS_ICONS.locations
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
                startContent={<Yesicon icon={CLASS_ICONS.logout} />}
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
