import { ProductWithQuantity, ProductWithQuantityFromDB } from '@/types'

const formatProductWithQuantity = (res: ProductWithQuantityFromDB): ProductWithQuantity => {
  return {
    id: res.productId,
    name: res.name,
    inventaryMin: res.inventaryMin,
    quantity: res.quantity
  }
}

export default formatProductWithQuantity
