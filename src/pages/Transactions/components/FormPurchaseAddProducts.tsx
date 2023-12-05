'use client'
import { useCartPurchase } from '@/hooks'
import { ESaleFor, Product } from '@/types'
import { Autocomplete, AutocompleteItem, Button, Checkbox, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type FormPurchaseAddProductsFields = {
  productId: number,
  costPerUnit: number,
  priceSale: number,
  quantity: number,
  profit: number,
  serialNumber: string
}

type Props = {
  products: Product[]
}

function FormPurchaseAddProducts ({ products }: Props) {
  const { addProductToCart, cartPurchase: { items } } = useCartPurchase()
  const { register, reset, resetField, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormPurchaseAddProductsFields>()
  const [isPerProfit, setIsPerProfit] = React.useState<boolean>(false)
  const [isPurchasePerQuantity, setIsPurchasePerQuantity] = React.useState<boolean>(true)
  const [productToAdd, setProductToAdd] = React.useState<Product>({} as Product)

  const toggleIsPerGanance = () => {
    setIsPerProfit(prev => !prev)
    resetField('profit')
  }

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data)
    const alreadyInCart = items.some(item => {
      if (isPurchasePerQuantity) return item.productId === productToAdd.id
      return item.productId === productToAdd.id && item.serialNumber === data.serialNumber
    })
    if (alreadyInCart) {
      toast('Producto ya en carrito.', {
        icon: '⚠️'
      })
      return
    }
    const quantity = isPurchasePerQuantity ? data.quantity : 1
    const cost = data.costPerUnit
    const priceSale = isPerProfit ? getValues('priceSale') : productToAdd.priceSale
    addProductToCart({
      productId: productToAdd.id,
      product: productToAdd.name,
      cost,
      priceSale,
      quantity,
      serialNumber: data.serialNumber || '',
      total: quantity * cost
    })
    reset()
    toast.success('Añadido al carrito.')
  })

  const handleChangeGanance = () => {
    const valueGanancePercent = getValues('profit')
    const valueGanance = valueGanancePercent / 100 * getValues('costPerUnit')
    const newSalePrice = getValues('costPerUnit') + valueGanance
    setValue('priceSale', newSalePrice)
  }

  React.useEffect(() => {
    if (productToAdd.saleFor === ESaleFor.quantity) setIsPurchasePerQuantity(true)
    else if (productToAdd.saleFor === ESaleFor.unit) setIsPurchasePerQuantity(false)
    reset()
  }, [productToAdd])

  return (
    <>
      <h2 className='title'>Agregue productos</h2>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
        <div className='flex flex-col md:flex-row gap-3'>
          <Autocomplete
            defaultItems={products}
            label='Producto'
            placeholder='Elija el producto'
            className='w-full md:max-w-sm'
            color={errors.productId ? 'danger' : 'default'}
            isInvalid={!!errors.productId}
            errorMessage={errors.productId?.message}
            {...register('productId', {
              required: {
                value: true,
                message: 'Seleccione un producto'
              }
            })}
          >
            {(item) => <AutocompleteItem key={item.id} value={item.id} onPress={() => setProductToAdd(item)}>{item.name}</AutocompleteItem>}
          </Autocomplete>
          <Input
            className={`w-full md:max-w-sm ${isPurchasePerQuantity && 'hidden'}`}
            label='Numero de serie'
            placeholder='Escriba el numero de serie'
            color={errors.serialNumber ? 'danger' : 'default'}
            isDisabled={isPurchasePerQuantity}
            isInvalid={!!errors.serialNumber}
            errorMessage={errors.serialNumber?.message}
            {...register('serialNumber', {
              required: {
                value: !isPurchasePerQuantity,
                message: 'Número de serie requerido'
              },
              disabled: isPurchasePerQuantity,
              validate: (v) => {
                const length = v.length
                if (length <= 17 && length >= 8) return true
                return 'De 8 a 17 carácteres'
              }
            })}
          />
          <Input
            className={`w-full md:max-w-sm ${!isPurchasePerQuantity && 'hidden'}`}
            type='number'
            label='Cantidad'
            placeholder='Indique la cantidad'
            color={errors.quantity ? 'danger' : 'default'}
            defaultValue='1'
            min={1}
            max={100}
            isDisabled={!isPurchasePerQuantity}
            isInvalid={!!errors.quantity}
            errorMessage={errors.quantity?.message}
            {...register('quantity', {
              required: {
                value: isPurchasePerQuantity,
                message: 'Cantidad requerida'
              },
              disabled: !isPurchasePerQuantity,
              validate: (v) => {
                if (v >= 1 && v <= 100) return true
                return 'Min. 1 , max. 100'
              },
              setValueAs: (v) => parseInt(v)
            })}
          />
          <Input
            type='number'
            className='w-full md:max-w-sm'
            label='Costo S/'
            placeholder='Costo por unidad'
            color={errors.costPerUnit ? 'danger' : 'default'}
            isInvalid={!!errors.costPerUnit}
            errorMessage={errors.costPerUnit?.message}
            {...register('costPerUnit', {
              required: {
                value: true,
                message: 'Costo requerido'
              },
              pattern: {
                value: /^(\d+)(\.\d{1,2})?$/,
                message: 'Costo inválido'
              },
              setValueAs: (v) => parseInt(v)
            })}
          />
          <Input
            type='number'
            className={`w-full md:max-w-sm ${!isPerProfit && 'hidden'}`}
            label='Ganancia %'
            placeholder='Ganancia deseada en %'
            color={errors.profit ? 'danger' : 'default'}
            isDisabled={!isPerProfit}
            isInvalid={!!errors.profit}
            errorMessage={errors.profit?.message}
            {...register('profit', {
              required: {
                value: isPerProfit,
                message: 'Ganancia requerida'
              },
              disabled: !isPerProfit,
              pattern: {
                value: /^(\d+)(\.\d{1,2})?$/,
                message: 'Ganancia inválida'
              },
              onChange: (v) => handleChangeGanance(),
              setValueAs: (v) => parseInt(v)
            })}
          />
          <Input
            type='number'
            isReadOnly
            className={`w-full md:max-w-sm ${!isPerProfit && 'hidden'}`}
            label='Precio de venta S/'
            placeholder='Defina la ganancia'
            {...register('priceSale', { setValueAs: (v) => parseInt(v) })}
          />
        </div>
        <Checkbox size='sm' onChange={toggleIsPerGanance} isSelected={isPerProfit} color='warning'>Definir precio por ganancia</Checkbox>
        <Button type='submit' className='w-full md:w-min' variant='flat' color='success'>Agregar</Button>
      </form>
    </>
  )
}
export default FormPurchaseAddProducts
