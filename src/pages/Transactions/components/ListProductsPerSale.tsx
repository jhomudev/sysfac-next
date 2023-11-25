'use client'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import { Product } from '@/types'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React from 'react'
import FormSaleAddProduct from './FormSaleAddProduct'

type Props = {
  products: Product[]
}

function ListProductsPerSale ({ products }: Props) {
  const [productToAdd, setProductToAdd] = React.useState<Product>({} as Product)
  const [showForm, setShowForm] = React.useState<boolean>(false)

  return (
    <>
      <motion.ul className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))]'>
        {
          products.map(product => (
            <Card key={product.id} as={motion.li} fullWidth className='flex-1'>
              <CardHeader className='flex flex-col'>
                <strong className='text-xl text-primary'>{product.name}</strong>
                <small className='text-mySoftDark'>4 disponibles</small>
              </CardHeader>
              <CardBody>
                <Image src='https://cdn-icons-png.flaticon.com/512/10810/10810368.png' alt='empty box' />
              </CardBody>
              <CardFooter className='flex justify-between'>
                <div className='text-tiny'>
                  <p>Precio: </p>
                  <span className='text-lg font-semibold text-secondary font-sans'>S/{product.priceSale.toFixed(2)}</span>
                </div>
                <Button
                  isIconOnly
                  radius='lg'
                  color='success'
                  onPress={() => {
                    setProductToAdd(product)
                    setShowForm(true)
                  }}
                ><Yesicon fontSize={20} icon={ICONS.cart} />
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </motion.ul>
      <FormSaleAddProduct product={productToAdd} isOpen={showForm} onOpenChange={setShowForm} />
    </>
  )
}
export default ListProductsPerSale
