import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalContent/* ,ModalFooter, Button  */ } from '@nextui-org/modal'
import { Link, Button } from '@nextui-org/react'
import CartTableItems from './CartTableItems'
import CartForm from './CartForm'
import CartTableInfo from './CartTableInfo'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { ICONS } from '@/contants'

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
            <ModalHeader className='flex items-center gap-4'>
              <strong>Carrito de venta</strong>
              <Button
                as={Link}
                href={`${ROUTES.sales}/new`}
                color='primary'
                size='sm'
                variant='bordered'
                startContent={<Yesicon icon={ICONS.plus} />}
              >Agregar
              </Button>
            </ModalHeader>
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
