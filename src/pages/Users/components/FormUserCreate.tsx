'use client'

import React from 'react'
import InputPassword from '@/components/InputPassword'
import { Button, Input, Select, SelectItem, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

type Formdata= {
  username: string,
  password: string,
  confirmPassword: string,
  type: string,
  state: string,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null
}

function FormUserCreate () {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const {
    register, handleSubmit, getValues, formState: {
      errors
    }
  } = useForm<Formdata>()

  const handleSubmitForm = handleSubmit(data => {
    setShowModal(true)
  })

  return (
    <>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-7'>
        <div>
          <h2 className='title'>Información personal</h2>
          <div className='flex flex-wrap gap-3'>
            <Input
              className='w-full md:w-[min(100%,400px)]'
              label='Nombres'
              placeholder='Escribe los nombres'
              variant='underlined'
              isInvalid={!!errors.names}
              errorMessage={!!errors.names && 'Campo requerido'}
              color={errors.names ? 'danger' : 'default'}
              {...register('names', { required: true })}
            />
            <Input
              className='w-full md:w-[min(100%,400px)]'
              label='Apellidos'
              placeholder='Escribe los apellidos'
              variant='underlined'
              isInvalid={!!errors.lastnames}
              errorMessage={!!errors.lastnames && 'Campo requerido'}
              color={errors.lastnames ? 'danger' : 'default'}
              {...register('lastnames', { required: true })}
            />
            <Input
              className='w-full md:w-[min(100%,400px)]'
              label='Correo'
              placeholder='Escribe el correo'
              variant='underlined'
              isInvalid={!!errors.email}
              errorMessage={!!errors.email && 'Correo inválido'}
              color={errors.email ? 'danger' : 'default'}
              {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i })}
            />
            <Input
              className='w-full md:w-[min(100%,400px)]'
              label='Teléfono'
              placeholder='Escribe el número celular'
              variant='underlined'
              isInvalid={!!errors.phone}
              errorMessage={!!errors.phone && 'Telèfono inválido'}
              color={errors.phone ? 'danger' : 'default'}
              {...register('phone', { required: true, min: 900000000, max: 999999999, valueAsNumber: true })}
            />
          </div>
        </div>
        <div>
          <h2 className='title'>Información de la cuenta</h2>
          <div className='flex flex-wrap gap-3'>
            <Input
              className='w-full md:w-[min(100%,400px)]'
              label='Usuario'
              placeholder='Escribe el nombre de usuario'
              variant='underlined'
              isInvalid={!!errors.username}
              errorMessage={!!errors.username && 'Campo requerido'}
              color={errors.username ? 'danger' : 'default'}
              {...register('username', { required: true })}
            />
            <Select
              className='w-full md:w-[min(100%,400px)]'
              placeholder='Seleccione el tipo'
              label='Tipo de usuario'
              variant='underlined'
              isInvalid={!!errors.type}
              errorMessage={!!errors.type && 'Campo requerido'}
              color={errors.type ? 'danger' : 'default'}
              {...register('type', { required: true })}
            >
              <SelectItem key='admin' value='admin'>Admin</SelectItem>
              <SelectItem key='superadmin' value='superadmin'>SuperAdmin</SelectItem>
              <SelectItem key='vendedor' value='vendedor'>vendedor</SelectItem>
            </Select>
            <Select
              className='w-full md:w-[min(100%,400px)]'
              placeholder='Seleccione el estado'
              label='Estado de usuario'
              variant='underlined'
              isInvalid={!!errors.state}
              errorMessage={!!errors.state && 'Campo requerido'}
              color={errors.state ? 'danger' : 'default'}
              {...register('state', { required: true })}
            >
              <SelectItem key='activo' value='activo'>Activo</SelectItem>
              <SelectItem key='inactivco' value='inactivco'>Inactivo</SelectItem>
            </Select>
          </div>
        </div>
        <div>
          <h2 className='title'>Contraseña de usuario</h2>
          <div className='flex flex-wrap gap-3'>
            <InputPassword
              className='w-full md:w-[min(100%,400px)]'
              variant='underlined'
              placeholder='Escriba el la contraseña'
              label='Contraseña'
              isInvalid={!!errors.password}
              errorMessage={!!errors.password && 'Campo requerido'}
              color={errors.password ? 'danger' : 'default'}
              registerUseForm={register('password', { required: true })}
            />
            <InputPassword
              className='w-full md:w-[min(100%,400px)]'
              variant='underlined'
              placeholder='Vuelva a escribir la contraseña'
              label='Confirmar contraseña'
              isInvalid={!!errors.confirmPassword}
              errorMessage={!!errors.confirmPassword && 'No coincide con la contraseña'}
              color={errors.confirmPassword ? 'danger' : 'default'}
              registerUseForm={register('confirmPassword', {
                required: true,
                validate: {
                  passwordMatch: (v) => v === getValues('password')
                }
              })}
            />
          </div>
        </div>
        <Button className='w-full md:w-min' type='submit' color='primary'>Crear usuario</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de crear este usuario?</p>
                <small><em className='text-warning'>NOTA: Al realizar esta acción esta ofreciendo acceso al sistema.</em></small>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={onClose}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormUserCreate
