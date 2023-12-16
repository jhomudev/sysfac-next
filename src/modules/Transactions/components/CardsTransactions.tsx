'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { Card, CardBody, Link } from '@nextui-org/react'
import { motion } from 'framer-motion'

function CardsTransactions () {
  return (
    <>
      <motion.article
        className='flex flex-1 h-full min-h-[100px]'
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card as={Link} href={`${ROUTES.purchases}/new`} className='border-success border-2 flex-1 '>
          <CardBody className='flex flex-row gap-3 items-center justify-center' style={{ color: COLORS_ENT.operationType.buy.hex }}>
            <Yesicon fontSize={20} icon={ICONS.plus} />
            <span>Nueva compra</span>
          </CardBody>
        </Card>
      </motion.article>
      <motion.article
        className='flex flex-1 h-full min-h-[100px]'
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card as={Link} href={`${ROUTES.sales}/new`} className='border-danger border-2  flex-1'>
          <CardBody className='flex flex-row gap-3 items-center justify-center' style={{ color: COLORS_ENT.operationType.sell.hex }}>
            <Yesicon fontSize={20} icon={ICONS.plus} />
            <span>Nueva venta</span>
          </CardBody>
        </Card>
      </motion.article>
    </>
  )
}
export default CardsTransactions
