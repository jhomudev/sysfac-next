import { Divider } from '@nextui-org/divider'
import React from 'react'

type Props = {
  children: React.ReactNode
}
function SuppliersLayout ({ children }: Props) {
  return (
    <>
      <h1 className='title-main'>Proveedores</h1>
      <p className='text'>Gestione los los proveedores que tiene la empresa, agregue, modifique datos, etc.</p>
      <br />
      <Divider />
      <br />
      {
        children
      }
    </>
  )
}
export default SuppliersLayout
