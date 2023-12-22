'use client'
import React from 'react'
import { useCart } from '@/hooks'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSale } from '@/modules/Transactions/hooks'
import { useClient } from '@/modules/Clients/hooks'
import { ClientToDB, EOperationType, EProofType, OperationToDB } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'

type FormDataUser = {
  names: string,
  lastnames: string,
  dniruc: `${number}`
}

type FormDataDiscount = {
  discount: number,
  typeDiscount: 'value' | 'percent'
}

function CartForm () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDataUser>()
  const { push } = useRouter()

  const formDiscount = useForm<FormDataDiscount>()
  const [typeDiscountForm, setTypeDiscountForm] = React.useState<'percent' | 'value'>('percent')
  const [isLoading, setIsLoading] = React.useState(false)

  const { addDiscount, clearCart, cart: { items, _import, discount, totalImport }, setShowCart } = useCart()
  const hasItems = items.length > 0

  const { data: session } = useSession()
  const { addClient } = useClient()
  const { doSale, addOperations } = useSale()

  const handleSubmitForm = handleSubmit(async (data) => {
    if (!hasItems) {
      toast.error('No hay productos en carrito')
      return
    }
    const dataF: ClientToDB = {
      dni: data.dniruc.length === 8 ? data.dniruc : undefined,
      ruc: data.dniruc.length === 13 ? data.dniruc : undefined,
      names: data.names,
      lastnames: data.lastnames
    }
    setIsLoading(true)
    const resAddClient = await addClient(dataF)
    if (!resAddClient?.ok) {
      setIsLoading(false)
      toast.error(resAddClient?.message || 'Error al crear cliente')
      return
    }

    const resDoSale = await doSale({
      clientId: resAddClient.data.insertId,
      discount,
      totalImport: _import,
      totalPay: totalImport,
      userId: session?.user.id ?? 0,
      comments: '',
      proofCode: crypto.randomUUID(),
      proofType: data.dniruc.length === 8 ? EProofType.ticket : EProofType.invoice
    })
    setIsLoading(false)
    if (!resDoSale?.ok) {
      toast.error(resDoSale?.message || 'Error al hacer venta')
      return
    }
    const operations: OperationToDB[] = items.map((item): OperationToDB => ({
      operationType: EOperationType.sell,
      description: item.product,
      serialNumber: item?.serialNumber ?? '',
      unitCost: item.unitPrice,
      quantity: item.quantity,
      importSale: item.unitPrice * item.quantity,
      details: item?.serialNumber ?? '',
      productId: item.productId,
      transactionId: resDoSale.data.insertId
    }))
    const resAddOperations = await addOperations(operations)
    if (!resAddOperations?.ok) return
    clearCart()
    setShowCart(false)
    push(ROUTES.transactions + '/sales')
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
          placeholder='Ingrese el DNI o RUC del cliente' endContent={<Yesicon icon={ICONS.search} />}
        /> */}
      </div>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-2'>
        <Input
          label='DNI o RUC'
          color={errors.dniruc ? 'danger' : 'default'}
          isInvalid={!!errors.dniruc}
          errorMessage={errors.dniruc?.message}
          {...register('dniruc', {
            required: 'Campo requerido',
            validate: (v) => {
              const isNumber = v.split('').every((n) => !isNaN(parseInt(n)))
              const isLenghtChartsOk = v.length === 8 || v.length === 13
              return (isNumber && isLenghtChartsOk) || 'DNI o RUC inválido'
            }
          })}
        />
        <Input
          label='Nombres del cliente'
          color={errors.names ? 'danger' : 'default'}
          isInvalid={!!errors.names}
          errorMessage={errors.names?.message}
          {...register('names', { required: true })}
        />
        <Input
          label='Apellidos del cliente'
          color={errors.lastnames ? 'danger' : 'default'}
          isInvalid={!!errors.lastnames}
          errorMessage={errors.lastnames && 'Campo requerido'}
          {...register('lastnames', { required: true })}
        />
        <Button isLoading={isLoading} fullWidth color='success' type='submit'>Realizar venta</Button>
      </form>
    </aside>
  )
}
export default CartForm
