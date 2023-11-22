'use client'
import { Select, SelectItem, Button, Checkbox, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'

const items = [
  {
    label: 'Laptop Hp 234',
    value: '1'
  },
  {
    label: 'impresora L405',
    value: '2'
  },
  {
    label: 'Monitor Hp 234',
    value: '3'
  },
  {
    label: 'Teclado Hp 234',
    value: '4'
  }
]

type FormPurchaseAddProductsFields = {
  productId: number,
  costPerUnit: number,
  priceSale: number,
  quantity: number,
  profit: number,
  serialNumber: string
}

function FormPurchaseAddProducts () {
  const { register, resetField, handleSubmit, formState: { errors } } = useForm<FormPurchaseAddProductsFields>()
  const [isPerProfit, setIsPerProfit] = React.useState<boolean>(false)
  const [isPurchasePerQuantity, setIsPurchasePerQuantity] = React.useState<boolean>(true)
  // const [valueProduct, setValueProduct] = React.useState<number>(0)

  const toggleIsPerGanance = () => {
    setIsPerProfit(prev => !prev)
    resetField('profit')
  }

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data)
  })

  const toggleIsPurchasePerQuantity = () => {
    setIsPurchasePerQuantity(prev => !prev)
    resetField('profit')
    resetField('serialNumber')
    resetField('quantity')
  }

  return (
    <>
      <h2 className='title'>Agregue productos</h2>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
        <div className='flex flex-col md:flex-row gap-3'>
          <Select
            // onSelectionChange={toggleIsPurchasePerQuantity}
            items={items}
            label='Producto'
            placeholder='Elija el producto'
            className='w-full md:max-w-sm'
            color={errors.productId ? 'danger' : 'default'}
            isInvalid={!!errors.productId}
            errorMessage={errors.productId && 'Seleccione un producto'}
            onSelectionChange={toggleIsPurchasePerQuantity}
            {...register('productId', { required: true })}
          >
            {(item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>}
          </Select>
          <Input
            className={`w-full md:max-w-sm ${isPurchasePerQuantity && 'hidden'}`}
            label='Numero de serie'
            placeholder='Escriba el numero de serie'
            color={errors.serialNumber ? 'danger' : 'default'}
            isDisabled={isPurchasePerQuantity}
            isInvalid={!!errors.serialNumber}
            errorMessage={errors.serialNumber && 'Escriba el NS'}
            {...register('serialNumber', { required: !isPurchasePerQuantity, disabled: isPurchasePerQuantity })}
          />
          <Input
            type='number'
            className={`w-full md:max-w-sm ${!isPurchasePerQuantity && 'hidden'}`}
            label='Cantidad'
            placeholder='Defina la cantidad'
            color={errors.quantity ? 'danger' : 'default'}
            isDisabled={!isPurchasePerQuantity}
            isInvalid={!!errors.quantity}
            errorMessage={errors.quantity && 'Defina la cantidad'}
            {...register('quantity', { required: isPurchasePerQuantity, valueAsNumber: true, disabled: !isPurchasePerQuantity })}
          />
          <Input
            type='number'
            className='w-full md:max-w-sm'
            label='Costo S/'
            placeholder='Costo por unidad'
            color={errors.costPerUnit ? 'danger' : 'default'}
            isInvalid={!!errors.costPerUnit}
            errorMessage={errors.costPerUnit && 'Defina el costo'}
            {...register('costPerUnit', { required: true, valueAsNumber: true })}
          />
          <Input
            type='number'
            className={`w-full md:max-w-sm ${!isPerProfit && 'hidden'}`}
            label='Ganancia %'
            placeholder='Ganancia deseada en %'
            color={errors.profit ? 'danger' : 'default'}
            isDisabled={!isPerProfit}
            isInvalid={!!errors.profit}
            errorMessage={errors.profit && 'Defina la ganancia'}
            {...register('profit', { required: isPerProfit, valueAsNumber: true, disabled: !isPerProfit })}
          />
          <Input
            type='number'
            isDisabled
            className={`w-full md:max-w-sm ${!isPerProfit && 'hidden'}`}
            label='Precio de venta S/'
            placeholder='Defina la ganancia'
          />
        </div>
        <Checkbox size='sm' onChange={toggleIsPerGanance} color='warning'>Definir precio por ganancia</Checkbox>
        <Button type='submit' className='w-full md:w-min' variant='flat' color='success'>Agregar</Button>
      </form>
    </>
  )
}
export default FormPurchaseAddProducts
