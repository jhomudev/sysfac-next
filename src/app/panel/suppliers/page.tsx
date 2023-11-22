'use client'
import { TableSuppliers } from '@/pages/Suppliers/components'
import { Supplier } from '@/pages/Suppliers/models'
import { Divider } from '@nextui-org/react'

const data:Supplier[] = [
  {
    id: 1,
    RUC: '112345676789',
    name: 'Proveedor 1',
    address: 'Jr. Marsical cacareees',
    phone: '998094343',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 2,
    RUC: '123456767892',
    name: 'Proveedor 2',
    address: 'Av. Aasambleas',
    phone: '998998998',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 3,
    RUC: '123456767898',
    name: 'Proveedor 3',
    address: 'Jr. Bellido',
    phone: '900990009',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 4,
    RUC: '1345656767898',
    name: 'Proveedor 4',
    address: 'Jr. Peresz de Regollar',
    phone: '968230122',
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  }
]

function Supplierspage () {
  return (
    <>
      <h1 className='title-main'>Proveedores</h1>
      <p className='text'>Gestione los los proveedores que tiene la empresa, agregue, modifique datos, etc.</p>
      <br />
      <Divider />
      <br />
      <TableSuppliers suppliers={data} />
    </>
  )
}
export default Supplierspage
