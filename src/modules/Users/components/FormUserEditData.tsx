'use client'
import { User, UserToDB } from '@/types'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '../hooks'

type FormUserEditDataFields= {
  names: string,
  lastnames: string,
  email: string,
  phone: `${number}`
}

type Props = {
  user:User
}

function FormUserEditData ({ user }: Props) {
  const { refresh } = useRouter()
  const { modifyUser } = useUser()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormUserEditDataFields>()
  const [showModal, setShowModal] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmitFormPersonalData = handleSubmit(() => setShowModal(true))
  const handleConfirm = async () => {
    const data: Partial<UserToDB> = watch()
    setIsLoading(true)
    const res = await modifyUser(user.username, data)
    setIsLoading(false)
    if (res?.ok) {
      setShowModal(false)
      refresh()
    }
  }

  return (
    <section id='personal'>
      <h2 className='title'>Información personal</h2>
      <form onSubmit={handleSubmitFormPersonalData}>
        <div className='flex gap-3 flex-wrap'>
          <Input
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba los nombres'
            label='Nombres'
            defaultValue={user.names}
            isInvalid={!!errors.names}
            color={errors.names ? 'danger' : 'default'}
            errorMessage={!!errors.names && 'Campo requerido'}
            {...register('names', { required: true })}
          />
          <Input
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba los apellidos'
            label='Apellidos'
            defaultValue={user.lastnames}
            isInvalid={!!errors.lastnames}
            color={errors.lastnames ? 'danger' : 'default'}
            errorMessage={!!errors.lastnames && 'Campo requerido'}
            {...register('lastnames', { required: true })}
          />
          <Input
            className='w-full md:w-[min(100%,400px)]'
            type='email'
            variant='underlined'
            placeholder='Escriba el email'
            label='Correo'
            defaultValue={user.email || ''}
            isInvalid={!!errors.email}
            color={errors.email ? 'danger' : 'default'}
            errorMessage={!!errors.email && 'Correo inválido'}
            {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i })}
          />
          <Input
            type='number'
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba el telefono'
            label='Teléfono'
            defaultValue={user.phone || ''}
            isInvalid={!!errors.phone}
            color={errors.phone ? 'danger' : 'default'}
            errorMessage={!!errors.phone && 'Teléfono inválido'}
            {...register('phone', { required: true, min: 900000000, max: 999999999, valueAsNumber: true })}
          />
        </div>
        <Button type='submit' className='w-full md:w-auto mt-4' color='primary'>Actualizar</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>
                  ¿Está seguro de actualizar la información del usuario?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button isLoading={isLoading} color='primary' onPress={handleConfirm}>
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  )
}
export default FormUserEditData
