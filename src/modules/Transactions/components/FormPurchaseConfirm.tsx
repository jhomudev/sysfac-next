'use client'
import { formatSupplier } from '@/adapters'
import { useCartPurchase } from '@/hooks'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, EOperationType, OperationToDB, SupplierFromDB } from '@/types'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { usePurchase } from '../hooks'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'
import { useSession } from 'next-auth/react'

type FormData= {
  supplierId: number,
  comments:string,
}

function FormPurchaseConfirm () {
  const { push } = useRouter()
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<SupplierFromDB[]>>('/api/suppliers?rowsPerPage=100', fetcher)
  if (error) console.log('Error al solicitar proveedores', error)
  const suppliers = React.useMemo(() => data?.data?.map(sup => formatSupplier(sup)) || [], [data])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoadingShop, setIsLoadingShop] = React.useState(false)

  const { data: session } = useSession()
  const { cartPurchase: { items, totalImport }, clearCart } = useCartPurchase()
  const { doPurchase, addOperations } = usePurchase()
  const hasCartItems = items.length > 0

  const handleSubmitForm = handleSubmit(() => setShowModal(true))

  const handleMakeShopping = async () => {
    setIsLoadingShop(true)
    const data = watch()
    if (!hasCartItems) {
      toast.error('No hay productos en carrito')
      return
    }

    const resDoPurchase = await doPurchase({
      supplierId: data.supplierId,
      totalPay: totalImport,
      userId: session?.user.id ?? 0,
      comments: data.comments
    })
    if (!resDoPurchase?.ok) {
      toast.error(resDoPurchase?.message || 'Error al realizar la compra')
      setIsLoadingShop(false)
      return
    }
    const operations: OperationToDB[] = items.map((item): OperationToDB => ({
      operationType: EOperationType.buy,
      description: item.product,
      serialNumber: item?.serialNumber ?? '',
      unitCost: item.cost,
      quantity: item.quantity,
      importSale: item.cost * item.quantity,
      details: item?.serialNumber ?? '',
      productId: item.productId,
      transactionId: resDoPurchase.data.insertId
    }))
    const resAddOperations = await addOperations(operations)
    setIsLoadingShop(false)
    if (!resAddOperations?.ok) return
    clearCart()
    setShowModal(false)
    push(ROUTES.transactions + '/purchases')
  }

  return (
    <>
      <h2 className='title'>Datos adicionales</h2>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
        <Select
          label='Proveedor'
          placeholder='Elija el proveedor'
          className='w-full md:max-w-sm'
          items={suppliers}
          color={errors.supplierId ? 'danger' : 'default'}
          isLoading={isLoading}
          isInvalid={!!errors.supplierId}
          errorMessage={errors.supplierId && 'Elija un proveedor'}
          {...register('supplierId', {
            required: {
              value: true,
              message: 'Proveedor requerido'
            },
            validate: (v) => {
              const isSupplier = suppliers.some(supplier => supplier.id === Number(v))
              return isSupplier || 'Elija un proveedor'
            },
            setValueAs: (v) => parseInt(v)
          })}
        >
          {
            (item) => (
              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
            )
          }
        </Select>
        <Textarea
          minRows={3}
          maxRows={6}
          label='Comentarios'
          placeholder='Deje unos comentarios o información adicional como los datos del responsable de la compra'
          {...register('comments')}
        />
        <Button type='submit' className='w-full md:w-min' variant='shadow' color='primary'>Realizar compra</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de realizar al compra?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button isLoading={isLoadingShop} color='primary' onPress={handleMakeShopping}>
                  Hacer compra
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormPurchaseConfirm
