'use client'
/* eslint-disable react/jsx-indent */
import { motion } from 'framer-motion'
import { useCategory } from '../hooks'
import CardCategory from './CardCategory'
import ListCategoriesSkeleton from './ListCategoriesSkeleton'

function ListCategories () {
  const { dataCategories: { categories, isLoading } } = useCategory()
  const hasCategories = categories.length > 0

  if (isLoading) {
    return (
    <div className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]'>
      <ListCategoriesSkeleton />
    </div>
    )
  }

  return (
    <>
      {
        !hasCategories
          ? <p>No hay categorias aún.</p>
          : <motion.ul className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]'>
              {
                categories.map((cat, i) => (
                  <CardCategory
                    key={cat.id}
                    customMotionI={i}
                    name={cat.name}
                    slug={cat.slug}
                    image={cat.image}
                  />
                ))
              }
            </motion.ul>

      }
    </>
  )
}
export default ListCategories
