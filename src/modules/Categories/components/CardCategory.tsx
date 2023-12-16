import ROUTES from '@/app/routes'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { Variants, motion } from 'framer-motion'
import Link from 'next/link'

type CardCategoryProps = {
  customMotionI?: number,
  name: string,
  image?: string,
  slug: string
}

function CardCategory ({ customMotionI, name, image, slug }: CardCategoryProps) {
  const variants: Variants = {
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring'
      }
    }),
    hidden: { scale: 0.5, opacity: 0 }
  }

  return (
    <motion.article
      custom={customMotionI}
      initial='hidden'
      animate='visible'
      variants={variants}
    >
      <Card as={Link} href={`${ROUTES.categories}/${slug}`} className='py-4' fullWidth isHoverable>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <small className='text-tiny font-bold'>Categoría</small>
          <h4 className='font-bold text-large'>{name}</h4>
        </CardHeader>
        <CardBody className='relative flex items-center overflow-visible py-2'>
          <Image
            alt={name}
            loading='lazy'
            className='w-full h-[160px]'
            src={image || 'https://media.istockphoto.com/id/1305169776/es/foto/q-y-un-concepto-signo-de-interrogaci%C3%B3n-amarillo-brillando-en-medio-de-signos-de-interrogaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=I0bcmVT1jY9jCP1Ow3BDnpqV31rR1QVMqq_NUBE14-s='}
          />
        </CardBody>
      </Card>
    </motion.article>
  )
}
export default CardCategory
