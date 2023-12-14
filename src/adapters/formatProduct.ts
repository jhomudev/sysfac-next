import { Product, ProductResponse } from '@/types'

const formatProduct = (res: ProductResponse): Product => {
  const formatedProduct: Product = {
    id: res.productId,
    image: res.image,
    name: res.name,
    priceSale: res.priceSale,
    saleFor: res.saleFor,
    inventaryMin: res.inventaryMin,
    unit: res.unit,
    isActive: res.isActive,
    category: {
      id: res.category.id,
      name: res.category.name,
      slug: res.category.slug
    },
    createdAt: res.createdAt,
    updatedAt: res.updatedAt

  }
  return formatedProduct
}

export default formatProduct
