import { UnitPerState, UnitPerStateRes } from '@/types'

const formatUnitPerState = (res: UnitPerStateRes): UnitPerState => {
  return {
    damaged: res.damaged.quantity,
    sold: res.sold.quantity,
    stock: res.stock.quantity
  }
}
export default formatUnitPerState
