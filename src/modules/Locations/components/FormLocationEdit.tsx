'use client'

import React from 'react'
import {
  Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Select, SelectItem
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { ELocationType, Location, LocationToDB } from '@/types'
import { useLocation } from '../hooks'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  name: string,
  address: string,
  type: ELocationType,
  canStoreMore: string
}
type Props= {
  location: Location
}
function FormLocationEdit ({ location }:Props) {
  const { dataLocations: { mutate }, modifyLocation } = useLocation()
  const { refresh } = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState(false)
  const [isLoadingEdit, setIsLoadingEdit] = React.useState(false)

  const handleSubmitForm = handleSubmit(() => setShowModal(true))

  const handleConfirmEdit = async () => {
    const { name, address, type, canStoreMore } = watch()
    const data: LocationToDB = { name, address, type, canStoreMore: canStoreMore === 'true' }
    setIsLoadingEdit(true)
    const res = await modifyLocation(location.id, data)
    setIsLoadingEdit(false)
    if (!res?.ok) {
      toast.error(res?.message || 'No permitido')
      return
    }
    setShowModal(false)
    mutate()
    refresh()
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
          defaultValue={location.name}
          color={errors.name ? 'danger' : 'default'}
          isInvalid={!!errors.name}
          errorMessage={errors.name && 'Escriba el nombre'}
          {...register('name', { required: true })}
        />
        <Select
          variant='underlined'
          label='CanStore'
          placeholder='Puede almacenar?'
          defaultSelectedKeys={[location.canStoreMore ? 'true' : 'false']}
          color={errors.canStoreMore ? 'danger' : 'default'}
          isInvalid={!!errors.canStoreMore}
          errorMessage={errors.canStoreMore && 'Seleccione una opción'}
          {...register('canStoreMore', { required: true })}
        >
          <SelectItem key='true'>Sí</SelectItem>
          <SelectItem key='false'>No</SelectItem>
        </Select>
        <Select
          variant='underlined'
          label='Tipo'
          placeholder='Seleccione el tipo de local'
          defaultSelectedKeys={[location.type]}
          color={errors.type ? 'danger' : 'default'}
          isInvalid={!!errors.type}
          items={Object.entries(ELocationType)}
          errorMessage={errors.type && 'Seleccione un tipo'}
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
          defaultValue={location.address}
          color={errors.address ? 'danger' : 'default'}
          isInvalid={!!errors.address}
          errorMessage={errors.address && 'Escriba la dirección'}
          {...register('address', { required: true })}
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
                  ¿Está seguro de actualizar la información del local?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button isLoading={isLoadingEdit} color='primary' onPress={handleConfirmEdit}>
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
export default FormLocationEdit
