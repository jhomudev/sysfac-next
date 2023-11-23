import { Divider } from '@nextui-org/react'
import React from 'react'

type Props ={
  children: React.ReactNode
}

function UsersLayout ({ children }:Props) {
  return (
    <>
      <h1 className='title-main'>Usuarios</h1>
      <p className='text'>Gestiona los usuarios que interactuan dentro del sistema, otorga y quita permisos y designa el estado de cada usuario.</p>
      <br />
      <Divider />
      <br />
      {children}
    </>
  )
}
export default UsersLayout
