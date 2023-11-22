import ROUTES from '@/app/routes'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { Button, Divider, Link } from '@nextui-org/react'
import React from 'react'

type Props={
  children: React.ReactNode
}
function CategoriesLayout ({ children }:Props) {
  return (
  // <div className='flex-1 p-2'>
    <>
      <div className='flex gap-3 flex-col md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='title-main'>Categorías</h1>
          <p className='text'>Gestiona las categorias de los productos que existen en el sistema, es necesario tener todos los productos categorizados segun algun criterrio.</p>
        </div>
        <Button as={Link} href={`${ROUTES.categories}/create`} color='primary' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nueva categoria</Button>
      </div>
      <br />
      <Divider />
      <br />
      {
          children
        }
    </>
  // </div>
  )
}
export default CategoriesLayout
