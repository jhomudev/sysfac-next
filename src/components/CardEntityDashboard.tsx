'use client'
import { Card, CardBody } from '@nextui-org/react'
import Yesicon from './Yesicon'
import Link from 'next/link'
import { motion } from 'framer-motion'

export type CardEntityDashboardProps = {
  route : string,
  label: string,
  quantity: number | `${number}`,
  color: string,
  icon: string,
}

function CardEntityDashboard ({ route, label, quantity, color, icon }: CardEntityDashboardProps) {
  return (
    <Link href={route} className='flex-[1_0_100px] flex h-36 max-h-[160px]'>
      <motion.article
        className='!flex !flex-1'
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Card fullWidth isHoverable className='flex-1'>
          <CardBody className='flex flex-row items-center justify-center gap-2'>
            <span style={{ color }}>
              <Yesicon icon={icon} fontSize={50} />
            </span>
            <div className='flex flex-col'>
              <span className='text-2xl font-semibold'>{quantity}</span>
              <strong className='text'>{label}</strong>
            </div>
          </CardBody>
        </Card>
      </motion.article>
    </Link>
  )
}
export default CardEntityDashboard
