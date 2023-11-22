import React from 'react'
import { Client } from '@/pages/Clients/models'
import { Divider } from '@nextui-org/react'
import { TableClients } from '@/pages/Clients/components'

const data:Client[] = [
  {
    id: 1,
    RUC: null,
    dni: '71730987',
    names: 'Juan',
    lastnames: 'Perez',
    address: 'Jr. Orquideas',
    phone: '123456789',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 2,
    RUC: '123456789123',
    dni: null,
    names: 'Carlos',
    lastnames: 'Ramirez',
    address: 'Jr. Juan Yucra',
    phone: '123456780',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  }
]

function ClientsPage () {
  return (
    <>
      <h1 className='title-main'>Clientes</h1>
      <p className='text'>Observe los clientes que tuvo durante todo su progreso con el sistema, si necesita puede modificar algunos datos del cliente.</p>
      <br />
      <Divider />
      <br />
      <TableClients clients={data} />
    </>
  )
}
export default ClientsPage
