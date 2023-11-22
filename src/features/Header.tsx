'use client'
import React from 'react'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { EUserType } from '@/types/enumDB'
import { Avatar, Badge, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Image } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Cart from './Cart'
import useCart from '@/hooks/useCart'

function Header () {
  const { data: session } = useSession()
  const user = session?.user

  const [showCart, setShowCart] = React.useState<boolean>(false)
  const { cart: { items } } = useCart()
  const hasItems = items.length > 0

  // React.useEffect(() => {
  //   const dataInLocalStorage = (typeof window !== 'undefined' && window.localStorage) && localStorage.getItem('__sysfac__store__')
  //   if (dataInLocalStorage) {
  //     updateCart(JSON.parse(dataInLocalStorage).cart)
  //   }
  // }, [])

  return (
    <>
      <header className='flex items-center justify-between h-[5rem] bg-myLight rounded-xl p-5 text-myDark'>
        <span>Hola <strong>{user?.names}</strong></span>
        <div className='flex gap-5 items-center'>
          <Badge content={items.length} shape='circle' color='danger' isInvisible={!hasItems}>
            <Button
              onPress={() => setShowCart(true)}
              radius='full'
              isIconOnly
              aria-label='Carrito de venta'
              variant='light'
            >
              <Yesicon fontSize={20} icon={CLASS_ICONS.cart} />
            </Button>
          </Badge>
          <Dropdown placement='bottom-end' className='max-w-sm'>
            <Badge content='99+' shape='circle' color='danger'>
              <DropdownTrigger>
                <Button
                  radius='full'
                  isIconOnly
                  aria-label='Notificaciones'
                  variant='light'
                >
                  <Yesicon fontSize={20} icon={CLASS_ICONS.notifications} />
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
              <DropdownSection title='Notificaciones'>
                <DropdownItem
                  key='unfinished_purchase'
                  description={<p className='line-clamp-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In distinctio ab tempore animi hic repudiandae, nam esse ut fugit labore.</p>}
                  startContent={<Image width={30} height={30} src='https://cdn-icons-png.flaticon.com/512/3847/3847867.png' alt='l-' />}
                >
                  Compra inconclusa
                </DropdownItem>
                <DropdownItem
                  key='unfinished_sale'
                  description={<p className='line-clamp-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In distinctio ab tempore animi hic repudiandae, nam esse ut fugit labore.</p>}
                  startContent={<Image width={30} height={30} src='https://cdn-icons-png.flaticon.com/512/5408/5408490.png' alt='l-' />}
                >
                  Venta inconclusa
                </DropdownItem>
                <DropdownItem
                  key='sold_out'
                  description={<p className='line-clamp-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In distinctio ab tempore animi hic repudiandae, nam esse ut fugit labore.</p>}
                  startContent={<Image width={30} height={30} src='https://cdn-icons-png.flaticon.com/512/5166/5166939.png' alt='l-' />}
                >
                  Producto por agotarse
                </DropdownItem>
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
                <Chip radius='md' className='mt-1' color={user?.type === EUserType.admin ? 'primary' : user?.type === EUserType.superadmin ? 'success' : 'warning'}>{user?.type}</Chip>
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
              <DropdownItem key='logout' color='danger'>
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
