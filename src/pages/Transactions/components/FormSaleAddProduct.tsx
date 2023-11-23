'use client'
import { useCart } from '@/hooks'
import { Product } from '@/types/Product'
import { ESaleFor } from '@/types/enums.d'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  product: Product,
  isOpen:boolean,
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = {
  serialNumber: string,
  quantity: number,
  details: string,
}

function FormSaleAddProduct ({ product, isOpen, onOpenChange }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { addProductToCart } = useCart()

  const isPerQuantity = product.saleFor === ESaleFor.quantity

  const handleSubmitForm = handleSubmit((data) => {
    const details = data.details
    const quantity = Number(data.quantity) || 1

    const addRes = addProductToCart({
      productId: product.id,
      product: product.name.concat(` ${details}`),
      quantity,
      serialNumber: data.serialNumber,
      unitPrice: Number(product.priceSale),
      total: product.priceSale * quantity
    })
    if (addRes?.ok) {
      toast.success(addRes?.message)
      onOpenChange(false)
      return
    }
    toast.error(addRes?.message)
  })

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent as='form' onSubmit={handleSubmitForm}>
        {(onClose) => (
          <>
            <ModalHeader>Agregar producto</ModalHeader>
            <ModalBody>
              <dl>
                <dt className='title mb-0'>Producto</dt>
                <dd className='text mb-2'>{product.name}</dd>
                <dt className='title mb-0'>Precio</dt>
                <dd className='text mb-2'>{product.priceSale.toFixed(2)}</dd>
                <dt className='title mb-0'>Venta por:</dt>
                <dd className='text mb-2'>{product.saleFor}</dd>
              </dl>
              <Input
                className={`${!isPerQuantity && 'hidden'}`}
                fullWidth
                type='number'
                defaultValue='1'
                label='Cantidad'
                color={errors.quantity ? 'danger' : 'default'}
                isInvalid={!!errors.quantity}
                errorMessage={errors.quantity && 'Defina la cantidad'}
                {...register('quantity', { required: true, disabled: !isPerQuantity, valueAsNumber: true })}
              />
              <Input
                className={`${isPerQuantity && 'hidden'}`}
                fullWidth
                color={errors.serialNumber ? 'danger' : 'default'}
                isInvalid={!!errors.serialNumber}
                errorMessage={errors.serialNumber && 'Escriba el número de serie'}
                label='Número de serie'
                {...register('serialNumber', { required: true, disabled: isPerQuantity, minLength: 8, maxLength: 17 })}
              />
              <Textarea
                fullWidth
                label='Detalles'
                minRows={3}
                maxRows={6}
                {...register('details')}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='default' variant='light' onPress={onClose}>
                Cancelar
              </Button>
              <Button type='submit' color='primary'>
                Agregar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default FormSaleAddProduct
