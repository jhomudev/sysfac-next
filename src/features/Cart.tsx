import { Modal, ModalHeader, ModalBody, ModalContent/* ,ModalFooter, Button  */ } from '@nextui-org/react'
import React from 'react'
import CartTableItems from './CartTableItems'
import CartForm from './CartForm'
import CartTableInfo from './CartTableInfo'

type CartProps ={
  isOpen:boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Cart ({ isOpen, toggleOpen }: CartProps) {
  return (
    <Modal size='5xl' isOpen={isOpen} onOpenChange={toggleOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='text-center'>Carrito de venta</ModalHeader>
            <ModalBody className='gap-3'>
              <div className='flex flex-col md:flex-row gap-5'>
                <CartTableItems />
                <CartForm />
              </div>
              <CartTableInfo />
            </ModalBody>
            {/* <ModalFooter>
              <Button color='default' variant='light' onPress={onClose}>
                Cancelar
              </Button>
              <Button type='submit' color='success'>
                Realizar venta
              </Button>
            </ModalFooter> */}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default Cart
