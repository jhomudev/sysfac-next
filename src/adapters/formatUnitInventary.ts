import { UnitInventary, UnitInventaryResponse } from '@/types'

const formatUnitInventary = (res: UnitInventaryResponse): UnitInventary => {
  const formatedUnit: UnitInventary = {
    id: res.unitId,
    serialNumber: res.serialNumber,
    state: res.state,
    product: {
      id: res.product.id,
      name: res.product.name
    },
    location: {
      id: res.location.id,
      name: res.location.name
    },
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  }
  return formatedUnit
}
export default formatUnitInventary
