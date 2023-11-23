'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'

type CardGraphicProps = {
  className: string,
  title: string,
  description: string,
  graphicData?: object,
  children: React.ReactNode
}

function CardGraphic ({ className, title, description, children }: CardGraphicProps) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-col items-start'>
        <h2 className='title'>{title}</h2>
        <p className='text'>{description}</p>
      </CardHeader>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
}
export default CardGraphic
