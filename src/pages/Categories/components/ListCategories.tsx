/* eslint-disable react/jsx-indent */
import { motion } from 'framer-motion'
import { Category } from '../models'
import { CardCategory } from '.'

type Props = {
  categories: Category[]
}

function ListCategories ({ categories }: Props) {
  const hasCategories = categories.length > 0

  return (
    <>
      {
      hasCategories
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
