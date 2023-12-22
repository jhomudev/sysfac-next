'use client'
import React from 'react'
import { Input, Select, SelectItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { EUserState, EUserType, User, UserToDB } from '@/types'
import { useUser } from '../hooks'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'

type FormUserEditAccountFields= {
  username: string,
  type: EUserType,
  state: EUserState,
}

type Props = {
  user: User
}

function FormUserEditAccount ({ user }: Props) {
  const { push } = useRouter()
  const { modifyUser } = useUser()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormUserEditAccountFields>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmitFormAccount = handleSubmit(() => setShowModal(true))

  const handleConfirm = async () => {
    const data: Partial<UserToDB> = watch()
    setIsLoading(true)
    const res = await modifyUser(user.username, data)
    setIsLoading(false)
    if (res?.ok) {
      setShowModal(false)
      push(`${ROUTES.users}/${data.username}/edit`)
    }
  }

  return (
    <section id='account'>
      <h2 className='title'>Información de la cuenta</h2>
      <form onSubmit={handleSubmitFormAccount}>
        <div className='flex gap-3 flex-wrap'>
          <Input
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba los nombre de usuario'
            label='Username'
            defaultValue={user.username}
            isInvalid={!!errors.username}
            color={errors.username ? 'danger' : 'default'}
            errorMessage={!!errors.username && 'Campo requerido'}
            {...register('username', { required: true })}
          />
          <Select
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Seleccione el tipo'
            label='Tipo de usuario'
            defaultSelectedKeys={[user.type]}
            isInvalid={!!errors.type}
            color={errors.type ? 'danger' : 'default'}
            errorMessage={!!errors.type && 'Campo requerido'}
            items={Object.entries(EUserType)}
            {...register('type', { required: true })}
          >
            {
                ([_, value]) => <SelectItem key={value} value={value}>{value}</SelectItem>
              }
          </Select>
          <Select
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Seleccione el estado'
            label='Estado de usuario'
            defaultSelectedKeys={[user.state]}
            isInvalid={!!errors.state}
            color={errors.state ? 'danger' : 'default'}
            errorMessage={!!errors.state && 'Campo requerido'}
            items={Object.entries(EUserState)}
            {...register('state', { required: true })}
          >
            {
                ([_, value]) => <SelectItem key={value} value={value}>{value}</SelectItem>
              }
          </Select>
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
                  ¿Está seguro de actualizar la información de la cuenta?
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
export default FormUserEditAccount
