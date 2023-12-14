import { Divider } from '@nextui-org/divider'
import React from 'react'

type Props = {
  children: React.ReactNode
}
function LocationLayout ({ children }: Props) {
  return (
    <>
      <h1 className='title-main'>Locales</h1>
      <p className='text'>Gestione los locales de la empresa, agregue, modifique datos, etc. Recuerde que conocer los lugares donde circulan los productos es importante.</p>
      <br />
      <Divider />
      <br />
      {
        children
      }
    </>
  )
}
export default LocationLayout
