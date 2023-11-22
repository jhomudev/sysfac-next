'use client'

import { Button, Select, SelectItem, Textarea, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'

const itemsSelect = [
  {
    label: 'Proveedor 1',
    value: 1
  },
  {
    label: 'Proveedor 2',
    value: 2
  },
  {
    label: 'Proveedor 3',
    value: 3
  },
  {
    label: 'Proveedor 4',
    value: 4
  }
]

type FormData= {
  supplierId: number,
  comments:string,
}

function FormPurchaseConfirm () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const handleSubmitForm = handleSubmit((data) => {
    setShowModal(true)
    console.log(data)
  })

  return (
    <>
      <h2 className='title'>Datos adicionales</h2>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
        <Select
          label='Proveedor'
          placeholder='Elija el proveedor'
          className='w-full md:max-w-sm'
          items={itemsSelect}
          color={errors.supplierId ? 'danger' : 'default'}
          isInvalid={!!errors.supplierId}
          errorMessage={errors.supplierId && 'Elija un proveedor'}
          {...register('supplierId', { required: true, valueAsNumber: true })}
        >
          {
            (item) => (
              <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
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
                <Button color='primary' onPress={onClose}>
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
