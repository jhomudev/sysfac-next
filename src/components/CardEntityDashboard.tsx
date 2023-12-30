'use client'
import { Card, CardBody, Link } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Yesicon from './Yesicon'

export type CardEntityDashboardProps = {
  id: 'users' | 'clients' | 'products' | 'transactions' | 'sales' | 'purchases',
  route?: string,
  label: string,
  quantity: number | `${number}`,
  color: string,
  icon: string,
}

function CardEntityDashboard ({ route, label, quantity, color, icon }: CardEntityDashboardProps) {
  return (
    <motion.article
      className='flex-[1_0_100px] flex h-36 min-h-[120px] max-h-[160px]'
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card as={Link} href={route} fullWidth isHoverable className='flex-1'>
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
  )
}

export default CardEntityDashboard
