'use client'
import React from 'react'
import { Input, InputProps } from '@nextui-org/react'
import Yesicon, { CLASS_ICONS } from './Yesicon'
import { RegisterOptions } from 'react-hook-form'

type InputPasswordProps = InputProps & {
  registerUseForm?: {
    name: string, options?: RegisterOptions
  }
}

function InputPassword (props: InputPasswordProps) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  const toggleShowPassword = () => {
    setIsVisible(isVisible => !isVisible)
  }

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      endContent={<button type='button' onClick={toggleShowPassword}><Yesicon fontSize={20} icon={!isVisible ? CLASS_ICONS.show : CLASS_ICONS.hidden} /></button>}
      placeholder='Password'
      {...props}
      {...props.registerUseForm}
    />
  )
}
export default InputPassword
