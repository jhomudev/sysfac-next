'use client'
/* eslint-disable react/jsx-indent */
import { motion } from 'framer-motion'
import CardCategory from './CardCategory'
import useSWR from 'swr'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, CategoryFromDB } from '@/types'
import { formatCategory } from '@/adapters'
import React from 'react'
import CategoriesSkeleton from './CategoriesSkeleton'

function ListCategories () {
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<CategoryFromDB[]>>('/api/categories', fetcher)
  if (error) console.log(error)
  const categories = React.useMemo(() => data?.data.map(cat => formatCategory(cat)) || [], [data])
  const hasCategories = categories.length > 0

  if (isLoading) {
    return (
    <div className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]'>
      <CategoriesSkeleton />
    </div>
    )
  }

  return (
    <>
      {
        !hasCategories
          ? <p>No hay categorias aún.</p>
          : <motion.div className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]'>
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
            </motion.div>

      }
    </>
  )
}
export default ListCategories
