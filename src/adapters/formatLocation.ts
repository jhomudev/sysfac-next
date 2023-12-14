import { Location, LocationFromDB } from '@/types'

const formatLocation = (res: LocationFromDB): Location => {
  const formatedLocation: Location = {
    id: res.localId,
    name: res.name,
    address: res.address,
    type: res.type,
    canStoreMore: res.canStoreMore,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  }

  return formatedLocation
}
export default formatLocation
