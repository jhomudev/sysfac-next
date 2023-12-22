'use client'

import React from 'react'
import {
  Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Select, SelectItem
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { ELocationType, LocationToDB } from '@/types'
import { useLocation } from '../hooks'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'

type FormData = {
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: string
}

function FormLocationCreate () {
  const { addLocation } = useLocation()
  const { push } = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoadingCreate, setIsLoadingCreate] = React.useState(false)

  const handleSubmitForm = handleSubmit(() => setShowModal(true))

  const handleConfirmCreate = async () => {
    const { name, address, type, canStoreMore } = watch()
    const data: LocationToDB = { name, address, type, canStoreMore: canStoreMore === 'true' }
    setIsLoadingCreate(true)
    const res = await addLocation(data)
    setIsLoadingCreate(false)
    if (res?.ok) push(ROUTES.locations)
  }

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
          color={errors.canStoreMore ? 'danger' : 'default'}
          isInvalid={!!errors.canStoreMore}
          errorMessage={errors.canStoreMore && 'Seleccione una opción'}
          defaultSelectedKeys={['true']}
          {...register('canStoreMore', { required: true })}
        >
          <SelectItem key='true'>Sí</SelectItem>
          <SelectItem key='false'>No</SelectItem>
        </Select>
        <Select
          variant='underlined'
          label='Tipo'
          placeholder='Seleccione el tipo de local'
          color={errors.type ? 'danger' : 'default'}
          isInvalid={!!errors.type}
          errorMessage={errors.type && 'Seleccione un tipo'}
          items={Object.entries(ELocationType)}
          {...register('type', { required: true })}
        >
          {
            ([_, type]) => <SelectItem key={type}>{type}</SelectItem>
          }
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
                <Button isLoading={isLoadingCreate} color='primary' onPress={handleConfirmCreate}>
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
