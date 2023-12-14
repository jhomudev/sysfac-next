import { Category, CategoryFromDB } from '@/types'

const formatCategory = (res: CategoryFromDB): Category => {
  const formatedCategory: Category = {
    id: res.categoryId,
    image: res.image,
    name: res.name,
    slug: res.slug,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  }

  return formatedCategory
}

export default formatCategory
