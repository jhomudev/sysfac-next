'use client'
import React from 'react'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'
import InputPassword from '@/components/InputPassword'
import { signIn } from 'next-auth/react'

function FormLogin () {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmitForm = handleSubmit(async (data) => {
    setIsLoading(true)
    const auth = await signIn('credentials', {
      ...data,
      redirect: false
    })
    setIsLoading(false)
    if (auth?.error) {
      toast.error('Acceso denegado.')
      return
    }
    router.push('/panel')
  })

  return (
    <form
      onSubmit={handleSubmitForm}
      className='flex gap-4 flex-col w-full max-w-sm text-myLight'
    >
      <Input
        isInvalid={!!errors.username}
        errorMessage={errors.username && 'Escriba su usuario'}
        color='success'
        variant='underlined'
        autoFocus
        startContent={<Yesicon className='text-mySoftLight' icon={ICONS.user} />}
        label='Nombre de usuario'
        {...register('username', { required: true })}
      />
      <InputPassword
        isInvalid={!!errors.password}
        errorMessage={!!errors.password && 'Introdusca la contraseña'}
        color='success'
        variant='underlined'
        startContent={<Yesicon className='text-mySoftLight' icon={ICONS.password} />}
        label='Password'
        registerUseForm={register('password', { required: true })}
      />
      <Button
        variant='ghost'
        type='submit'
        color='success'
        isLoading={isLoading}
      >Entrar
      </Button>
    </form>
  )
}
export default FormLogin
