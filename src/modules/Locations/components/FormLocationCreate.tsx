'use client'

import React from 'react'
import {
  Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Select, SelectItem
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { ELocationType } from '@/types'

type FormData = {
  name: string,
  address: string,
  type: string,
  canStore: boolean
}

function FormLocationCreate () {
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
          variant='underlined'
          label='Nombre'
          placeholder='Escriba el nombre del local'
          color={errors.name ? 'danger' : 'default'}
          isInvalid={!!errors.name}
          errorMessage={errors.name && 'Escriba el nombre'}
          {...register('name', { required: true })}
        />
        <Select
          variant='underlined'
          label='CanStore'
          placeholder='Puede almacenar?'
          color={errors.canStore ? 'danger' : 'default'}
          isInvalid={!!errors.canStore}
          errorMessage={errors.canStore && 'Seleccione una opción'}
          {...register('canStore', { required: true })}
        >
          <SelectItem key='true' value={1}>Sí</SelectItem>
          <SelectItem key='false' value={0}>No</SelectItem>
        </Select>
        <Select
          variant='underlined'
          label='Tipo'
          placeholder='Seleccione el tipo de local'
          color={errors.type ? 'danger' : 'default'}
          isInvalid={!!errors.type}
          errorMessage={errors.type && 'Seleccione un tipo'}
          {...register('type', { required: true })}
        >
          <SelectItem key={ELocationType.store} value={ELocationType.store}>{ELocationType.store}</SelectItem>
          <SelectItem key={ELocationType.warehouse} value={ELocationType.warehouse}>{ELocationType.warehouse}</SelectItem>
        </Select>
        <Input
          variant='underlined'
          label='Dirección'
          placeholder='Escriba la dirección'
          color={errors.address ? 'danger' : 'default'}
          isInvalid={!!errors.address}
          errorMessage={errors.address && 'Escriba la dirección'}
          {...register('address', { required: true })}
        />
        <Button className='w-full md:w-min' color='primary' type='submit'>Crear</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>
                  ¿Está seguro de agregar el local?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color='primary' onPress={onClose}
                >
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormLocationCreate
