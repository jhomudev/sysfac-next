import { TableLocations } from '@/pages/Locations/components'
import { Location } from '@/pages/Locations/models'
import { ELocationType } from '@/types-old/enums'
import { Divider } from '@nextui-org/react'

const data: Location[] = [
  {
    id: 1,
    name: 'Local 1',
    type: ELocationType.warehouse,
    address: 'Jr. Libertad',
    canStoreMore: true,
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 2,
    name: 'Local 2',
    type: ELocationType.store,
    address: 'Jr. Asambleas',
    canStoreMore: true,
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  },
  {
    id: 3,
    name: 'Local 3',
    type: ELocationType.store,
    address: 'Jr. Bellido',
    canStoreMore: false,
    createdAt: '2023-11-09 10:03:07',
    updatedAt: '2023-11-09 10:03:07'
  }
]

function LocationsPage () {
  return (
  // <div className='flex-1 p-2'>
    <>
      <h1 className='title-main'>Locales</h1>
      <p className='text'>Gestione los locales de la empresa o negocio, agregue o quite locales, es importante tener registrados los locales en donde circulan los productos.</p>
      <br />
      <Divider />
      <br />
      <TableLocations locations={data} />
    </>
  // </div>
  )
}
export default LocationsPage
