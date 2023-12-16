import React from 'react'
import { Divider } from '@nextui-org/react'
import TableClients from '@/modules/Clients/components/TableClients'

function ClientsPage () {
  return (
    <>
      <h1 className='title-main'>Clientes</h1>
      <p className='text'>Observe los clientes que tuvo durante todo su progreso con el sistema, si necesita puede modificar algunos datos del cliente.</p>
      <br />
      <Divider />
      <br />
      <TableClients />
    </>
  )
}
export default ClientsPage
