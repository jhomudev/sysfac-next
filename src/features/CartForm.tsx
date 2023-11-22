'use client'
import useCart from '@/hooks/useCart'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
  names: string,
  lastnames: string,
  dni: number,
}
type FormDataDiscount = {
  discount: number,
  typeDiscount: 'value' | 'percent'
}

function CartForm () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const formDiscount = useForm<FormDataDiscount>()
  const { addDiscount, cart: { items, _import } } = useCart()
  const hasItems = items.length > 0
  const [typeDiscountForm, setTypeDiscountForm] = React.useState<'percent' | 'value'>('percent')

  const handleSubmitForm = handleSubmit((data) => {
    if (!hasItems) {
      toast.error('No hay productos en carrito')
    }
    console.log(data)
  })

  const handleSubmitDiscount = formDiscount.handleSubmit((data) => {
    if (!hasItems) {
      toast.error('No hay productos en carrito')
      return
    }

    const typeDiscount = data.typeDiscount
    const discount = data.discount

    const valueDiscount = typeDiscount === 'percent' ? (discount / 100 * _import) : discount
    addDiscount(valueDiscount)
    toast.success('Descuento aplicado')
  })

  return (
    <aside className='flex flex-col gap-3 w-full md:w-[30%]'>
      <form onSubmit={handleSubmitDiscount} className='flex flex-col gap-2'>
        <h2 className='title'>Detalles de venta</h2>
        <div className='flex gap-2'>
          <Select
            label='Tipo de descuento'
            defaultSelectedKeys={['percent']}
            color={formDiscount.formState.errors.typeDiscount ? 'danger' : 'default'}
            isInvalid={!!formDiscount.formState.errors.typeDiscount}
            errorMessage={formDiscount.formState.errors.typeDiscount && 'Campo requerido'}
            {...formDiscount.register('typeDiscount', {
              required: true,
              onChange: (e) => {
                const value = e.target.value
                setTypeDiscountForm(value)
              }
            })}
          >
            <SelectItem key='percent'>Porcentaje</SelectItem>
            <SelectItem key='value'>Valor absoluto</SelectItem>
          </Select>
          <Input
            type='number'
            label='Descuento'
            placeholder={`${typeDiscountForm === 'percent' ? 'En %' : 'En S/'}`}
            color={formDiscount.formState.errors.discount ? 'danger' : 'default'}
            isInvalid={!!formDiscount.formState.errors.discount}
            errorMessage={formDiscount.formState.errors.discount && 'Campo requerido'}
            {...formDiscount.register('discount', { required: true, valueAsNumber: true })}
          />
        </div>
        <Button fullWidth color='secondary' variant='bordered' type='submit'>Hacer descuento</Button>
      </form>
      <div>
        <h2 className='title'>Cliente</h2>
        {/* <Input
          variant='bordered'
          placeholder='Ingrese el DNI o RUC del cliente' endContent={<Yesicon icon={CLASS_ICONS.search} />}
        /> */}
      </div>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-2'>
        <Input
          // disabled
          // readOnly
          type='number'
          label='DNI'
          color={errors.dni ? 'danger' : 'default'}
          isInvalid={!!errors.dni}
          errorMessage={errors.dni && 'Campo requerido'}
          {...register('dni', { required: true, valueAsNumber: true })}
        />
        <Input
          // disabled
          // readOnly
          label='Nombres del cliente'
          color={errors.names ? 'danger' : 'default'}
          isInvalid={!!errors.names}
          errorMessage={errors.names && 'Campo requerido'}
          {...register('names', { required: true })}
        />
        <Input
          // disabled
          // readOnly
          label='Apellidos del cliente'
          color={errors.lastnames ? 'danger' : 'default'}
          isInvalid={!!errors.lastnames}
          errorMessage={errors.lastnames && 'Campo requerido'}
          {...register('lastnames', { required: true })}
        />
        {/* <Input
          // disabled
          // readOnly
          label='RUC'
        /> */}
        <Button fullWidth color='success' type='submit'>Realizar venta</Button>
      </form>
    </aside>

  )
}
export default CartForm
