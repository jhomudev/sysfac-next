'use client'

import React from 'react'
import {
  Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, ModalContent
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { Supplier } from '@/types'

type FormData = {
  ruc: number | `${number}`,
  name: string,
  address: string,
  phone: number | `${number}`
}

type Props = {
  supplier: Supplier
}

function FormSupplierEdit ({ supplier }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const handleSubmitForm = handleSubmit((data) => {
    setShowModal(true)
    console.log(data)
  })

  return (
    <>
      <form
        className='flex flex-col gap-3'
        onSubmit={handleSubmitForm}
      >
        <Input
          size='lg'
          variant='underlined'
          label='RUC'
          placeholder='Escriba el RUC'
          defaultValue={supplier.ruc}
          color={errors.ruc ? 'danger' : 'default'}
          isInvalid={!!errors.ruc}
          errorMessage={errors.ruc && 'RUC inválido'}
          {...register('ruc', { required: true, pattern: /^\d{12}$/ })}
        />
        <Input
          size='lg'
          variant='underlined'
          label='Nombre'
          placeholder='Escriba el nombre del proveedor'
          defaultValue={supplier.name}
          color={errors.name ? 'danger' : 'default'}
          isInvalid={!!errors.name}
          errorMessage={errors.name && 'Escriba el nombre'}
          {...register('name', { required: true })}
        />
        <Input
          size='lg'
          variant='underlined'
          label='Dirección'
          defaultValue={supplier.address}
          placeholder='Escriba la dirección'
          color={errors.address ? 'danger' : 'default'}
          isInvalid={!!errors.address}
          {...register('address', { required: false })}
        />
        <Input
          size='lg'
          type='number'
          variant='underlined'
          label='Teléfono'
          placeholder='Escriba el teléfono'
          defaultValue={supplier.phone || ''}
          color={errors.phone ? 'danger' : 'default'}
          isInvalid={!!errors.phone}
          errorMessage={errors.phone && 'Teléfono inválido'}
          {...register('phone', { pattern: /^\d{9}$/ })}
        />
        <Button className='w-full md:w-min' size='lg' color='primary' type='submit'>Actualizar</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>
                  ¿Está seguro de modificar los datos del proveedor?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color='primary' onPress={onClose}
                >
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormSupplierEdit
