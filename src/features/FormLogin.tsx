'use client'
import React from 'react'
import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CLASS_ICONS, Yesicon } from '@/components'

function FormLogin () {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  const toggleShowPassword = () => {
    setIsVisible(isVisible => !isVisible)
  }

  const handleSubmitForm = handleSubmit(async (data) => {
    setIsLoading(true)
    const auth = await signIn('credentials', {
      ...data,
      redirect: false
    })
    setIsLoading(false)
    console.log(auth)
    if (auth?.error) {
      toast.error('Acceso denegado.')
      return
    }
    router.replace('/panel')
  })

  return (
    <form
      onSubmit={handleSubmitForm}
      className='flex gap-4 flex-col w-full max-w-sm text-myLight'
    >
      <Input
        isInvalid={!!errors.username}
        errorMessage={errors.username && 'Este campo es requerido'}
        color='success'
        variant='underlined'
        startContent={<Yesicon className='text-mySoftLight' icon={CLASS_ICONS.user} />}
        placeholder='username'
        {...register('username', { required: true })}
      />
      <Input
        type={isVisible ? 'text' : 'password'}
        endContent={<button type='button' onClick={toggleShowPassword}><Yesicon fontSize={20} icon={!isVisible ? CLASS_ICONS.show : CLASS_ICONS.hidden} /></button>}
        isInvalid={!!errors.password}
        errorMessage={!!errors.password && 'Este campo es requerido'}
        color='success'
        variant='underlined'
        startContent={<Yesicon className='text-mySoftLight' icon={CLASS_ICONS.password} />}
        placeholder='Password'
        {...register('password', { required: true })}
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
