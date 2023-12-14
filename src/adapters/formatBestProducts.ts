import { BestProducts, BestProductsRes } from '@/types'

const formatBestProducts = (res: BestProductsRes): BestProducts => {
  const formatedData: BestProducts = {
    bestPerpurchases: res.bestPerpurchases,
    bestPersales: res.bestPersales
  }
  return formatedData
}
export default formatBestProducts
