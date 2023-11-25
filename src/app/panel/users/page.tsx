import TableUsers from '@/pages/Users/components/TableUsers'
import { EUserState, EUserType, User } from '@/types'
import React from 'react'

const data:User[] = [
  {
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
  },
  {
    id: 2,
    username: 'usuario2',
    names: 'Carlos',
    lastnames: 'Ramirez',
    type: EUserType.seller,
    email: 'carlos.ramirez@email.com',
    phone: '123456780',
    password: 'asdfsdf',
    state: EUserState.active,
    createdAt: '',
    updatedAt: ''
  }
]

function UsersPage () {
  return (
    <>
      <TableUsers users={data} />
    </>
  )
}
export default UsersPage
