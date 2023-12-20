'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { useCart } from '@/hooks'
import { useNotification } from '@/modules/Notifications/hooks'
import { EUserType } from '@/types'
import { Avatar, Badge, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Image, Link } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Cart from './Cart'

function Header () {
  const { data: session } = useSession()
  const user = session?.user

  const { notifications } = useNotification()
  const hasNotifications = notifications.length > 0

  const { cart: { items }, setShowCart, showCart } = useCart()
  const hasItemsInCart = items.length > 0

  const colorUserType = user?.type === EUserType.admin
    ? COLORS_ENT.userType.admin.nextui
    : user?.type === EUserType.seller ? COLORS_ENT.userType.seller.nextui : COLORS_ENT.userType.superadmin.nextui

  return (
    <>
      <header className='flex items-center justify-between h-[5rem] bg-myLight rounded-xl p-5 text-myDark'>
        <span>Hola <strong>{user?.names}</strong></span>
        <div className='flex gap-5 items-center'>
          <Button
            size='sm'
            color={COLORS_ENT.operationType.sell.nextui}
            startContent={<Yesicon icon={ICONS.sales} />}
            as={Link}
            href={`${ROUTES.sales}/new`}
          >Nueva venta
          </Button>
          <Badge content={items.length} shape='circle' color='danger' isInvisible={!hasItemsInCart}>
            <Button
              onPress={() => setShowCart(true)}
              radius='full'
              isIconOnly
              aria-label='Carrito de venta'
              variant='light'
            >
              <Yesicon fontSize={20} icon={ICONS.cart} />
            </Button>
          </Badge>
          <Dropdown
            placement='bottom-end' className='max-w-sm md:min-w-[300px] '
          >
            <Badge content={notifications.length} shape='circle' color='danger' isInvisible={!hasNotifications}>
              <DropdownTrigger>
                <Button
                  radius='full'
                  isIconOnly
                  aria-label='Notificaciones'
                  variant='light'
                >
                  <Yesicon fontSize={20} icon={ICONS.notifications} />
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu
              classNames={{
                list: 'max-h-[500px] overflow-auto'
              }}
              variant='faded'
              aria-label='notifications'
              items={notifications}
              disabledKeys={['empty']}
              emptyContent='No hay notificaiones'
            >
              <DropdownSection title='Notificaciones'>
                {
                  hasNotifications
                    ? notifications.map((item) => (
                      <DropdownItem
                        key={item.key}
                        onPress={() => item.handle()}
                        description={<p className='line-clamp-2'>{item.description}</p>}
                        startContent={<Image width={30} height={30} src={item.image} alt='image' />}
                      >
                        {item.label}
                      </DropdownItem>
                    ))
                    : <DropdownItem key='empty' description='No hay notificaciones' />
                }
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                size='sm'
                isBordered
                as='button'
                className='transition-transform'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{user?.email}</p>
                <Chip radius='md' className='mt-1' color={colorUserType}>{user?.type}</Chip>
              </DropdownItem>
              <DropdownItem key='settings'>
                My Settings
              </DropdownItem>
              <DropdownItem key='team_settings'>Team Settings</DropdownItem>
              <DropdownItem key='analytics'>
                Analytics
              </DropdownItem>
              <DropdownItem key='system'>System</DropdownItem>
              <DropdownItem key='configurations'>Configurations</DropdownItem>
              <DropdownItem key='help_and_feedback'>
                Help & Feedback
              </DropdownItem>
              <DropdownItem onPress={() => signOut()} key='logout' color='danger'>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
      <Cart isOpen={showCart} toggleOpen={setShowCart} />
    </>
  )
}
export default Header
