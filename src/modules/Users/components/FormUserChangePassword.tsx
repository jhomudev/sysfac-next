'use client'
import InputPassword from '@/components/InputPassword'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import React from 'react'
import { User, UserToDB } from '@/types'
import { useRouter } from 'next/navigation'
import { useUser } from '../hooks'

type FormUserChangePasswordFields= {
  password: string,
  confirmPassword: string,
}

type Props = {
  user: User
}

function FormUserChangePassword ({ user }:Props) {
  const { refresh } = useRouter()
  const { modifyUser } = useUser()
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<FormUserChangePasswordFields>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmitFormPassword = handleSubmit(() => setShowModal(true))

  const handleConfirm = async () => {
    const { password }: Partial<UserToDB> = watch()
    setIsLoading(true)
    const res = await modifyUser(user.username, { password })
    setIsLoading(false)
    if (res?.ok) {
      setShowModal(false)
      refresh()
    }
  }

  return (
    <section id='password'>
      <h2 className='title'>Cambiar contraseña</h2>
      <form onSubmit={handleSubmitFormPassword}>
        <div className='flex gap-3 flex-wrap'>
          <InputPassword
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba la contraseña'
            label='Contraseña'
            isInvalid={!!errors.password}
            color={errors.password ? 'danger' : 'default'}
            errorMessage={!!errors.password && 'Campo requerido'}
            registerUseForm={register('password', { required: true })}
          />
          <InputPassword
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Vuelva a escribir la contraseña'
            label='Confirmar contraseña'
            isInvalid={!!errors.confirmPassword}
            color={errors.confirmPassword ? 'danger' : 'default'}
            errorMessage={!!errors.confirmPassword && 'No coincide con la contraseña'}
            registerUseForm={register('confirmPassword', {
              required: true,
              validate: {
                passwordMatch: (v) => v === getValues('password')
              }
            })}
          />
        </div>
        <Button type='submit' className='w-full md:w-auto mt-4' color='primary'>Cambiar contraseña</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de cambiar la contraseña?</p>
                <small><em className='text-warning'>OJO: Esta acción es importante para el acceso del usuario al sistema</em></small>
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
export default FormUserChangePassword
