'use client'
import CardCategory from '@/components/CardCategory'
import { TCategory } from '@/types/types'
import { Divider } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React from 'react'

const categories: TCategory[] = [
  {
    categoryId: 1,
    name: 'Laptops',
    slug: 'laptops',
    image: 'https://i.insider.com/61a930fc5d47cc0018e9160c?width=700'
  },
  {
    categoryId: 2,
    name: 'PC',
    slug: 'pc'
  },
  {
    categoryId: 3,
    name: 'Mouses',
    slug: 'mouses',
    image: 'https://assetsio.reedpopcdn.com/g502x_f9QuuM8.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'
  },
  {
    categoryId: 4,
    name: 'Teclado',
    slug: 'teclado',
    image: 'https://i.blogs.es/8c11b5/teclados-ap/1366_2000.jpeg'
  },
  {
    categoryId: 5,
    slug: 'impresoras',
    name: 'Impresoras'
  },
  {
    categoryId: 6,
    name: 'Monitores',
    slug: 'monitores'
  },
  {
    categoryId: 7,
    slug: 'teclado',
    name: 'teclados'
  }
]

function CategoriesPage () {
  return (
    <>
      <div className='flex-1 p-2'>
        <h1 className='text-2xl font-medium mb-3'>Categorías</h1>
        <Divider />
        <br />
        <motion.div className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]'>
          {
            categories.map((cat, i) => (
              <CardCategory key={cat.name} {...cat} customMotionI={i} />
            ))
          }
        </motion.div>
      </div>
    </>
  )
}
export default CategoriesPage
