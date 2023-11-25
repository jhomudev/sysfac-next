import TableLocations from '@/pages/Locations/components/TableLocations'
import { ELocationType, Location } from '@/types'

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
    <>
      <TableLocations locations={data} />
    </>
  )
}
export default LocationsPage
