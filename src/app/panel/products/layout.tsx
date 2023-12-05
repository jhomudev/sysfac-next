import { Divider } from '@nextui-org/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}
function ProductsLayout ({ children }: Props) {
  return (
    <div className='flex-1 p-2'>
      <h1 className='title-main'>Productos</h1>
      <p className='text'>Gestiona los productos dentro del sistema, agregue nuevos productos al inventario, modifique información o elimine los productos que considere.</p>
      <br />
      <Divider />
      <br />
      {children}
    </div>
  )
}
export default ProductsLayout
