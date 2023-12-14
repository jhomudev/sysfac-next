import { IGV } from '@/contants'
import { CartModalContext } from '@/context/CartModalContext'
import { setCart, addItem, deleteItem, gratifyItem, makeDiscount } from '@/store/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/storeActions'
import { Cart, CartItemId, CartItemWithoutId } from '@/types'
import { useContext } from 'react'

const useCart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)
  const { showCart, setShowCart } = useContext(CartModalContext)

  const updateCart = (data: Cart) => {
    dispatch(setCart(data))
  }

  const addProductToCart = (item: CartItemWithoutId) => {
    const alreadyProduct = cart.items.some(itemCart => {
      const isSameProduct = itemCart.productId === item.productId
      const isProductByNS = !!itemCart.serialNumber
      const serialNumberDuplicated = itemCart.serialNumber === item.serialNumber
      return isProductByNS ? serialNumberDuplicated : isSameProduct
    })
    if (alreadyProduct) {
      return {
        ok: false,
        message: 'El producto ya esta en el carrito'
      }
    }
    dispatch(addItem({ itemId: crypto.randomUUID(), ...item }))
    return {
      ok: true,
      message: 'Producto agregado al carrito'
    }
  }

  const removeProductFromCart = (itemId: CartItemId) => {
    dispatch(deleteItem(itemId))
  }

  const gratifyProduct = (itemId: CartItemId) => {
    dispatch(gratifyItem(itemId))
  }

  const addDiscount = (discount: number) => {
    dispatch(makeDiscount(discount))
  }

  const _import = cart.items.reduce((total, item) => total + item.total, 0)

  const discount = cart.discount

  const totalImport = (() => {
    // const discountInMoney = discount / 100 * _import
    const importWithDiscount = _import - discount
    const IGVinMoney = IGV / 100 * importWithDiscount

    return importWithDiscount + IGVinMoney
  })()

  return {
    showCart,
    setShowCart,
    cart: {
      items: cart.items,
      discount,
      _import,
      totalImport
    },
    updateCart,
    addProductToCart,
    removeProductFromCart,
    gratifyProduct,
    addDiscount
  }
}
export default useCart
