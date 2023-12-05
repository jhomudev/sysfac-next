import React from 'react'

type TCartModalContext = {
  showCart: boolean,
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartModalContext = React.createContext<TCartModalContext>({} as TCartModalContext)

const CartModalProvider = ({ children }: {children: React.ReactNode}) => {
  const [showCart, setShowCart] = React.useState<boolean>(false)

  return (
    <CartModalContext.Provider value={{
      showCart,
      setShowCart
    }}
    >
      {children}
    </CartModalContext.Provider>
  )
}

export default CartModalProvider
