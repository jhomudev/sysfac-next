import { UnitInventaryFromDB, UnitInventaryResponse } from '@/types'

const formatUnitInventaryResponse = (res: UnitInventaryFromDB): UnitInventaryResponse => {
  const formatedResponseUnit: UnitInventaryResponse = {
    unitId: res.unitId,
    serialNumber: res.serialNumber,
    state: res.state,
    product: {
      id: res.productId,
      name: res.productName
    },
    location: {
      id: res.localId,
      name: res.locationName
    },
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  }
  return formatedResponseUnit
}
export default formatUnitInventaryResponse
