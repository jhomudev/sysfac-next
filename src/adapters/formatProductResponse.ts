import { ProductFromDB, ProductResponse } from '@/types'

// Format the DB query response to response api
const formatProductResponse = (res: ProductFromDB): ProductResponse => {
  const {
    productId,
    categoryId,
    name,
    image,
    inventaryMin,
    priceSale,
    saleFor,
    unit,
    isActive,
    categoryName,
    categorySlug,
    createdAt,
    updatedAt
  } = res
  const productFormated: ProductResponse = {
    productId,
    name,
    image,
    inventaryMin,
    priceSale,
    unit,
    saleFor,
    isActive,
    category: {
      id: categoryId,
      slug: categorySlug,
      name: categoryName
    },
    createdAt,
    updatedAt
  }

  return productFormated
}

export default formatProductResponse
