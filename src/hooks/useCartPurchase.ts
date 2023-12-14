import { addItem, deleteItem, clearItems } from '@/store/slices/cartPurchaseSlice'
import { CartPurchaseItemId, CartPurchaseItemWhithoutId } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store/storeActions'

const useCartPurchase = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cartPurchase)

  const addProductToCart = (item: CartPurchaseItemWhithoutId) => {
    const alreadyProduct = items.some(itemCart => {
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

  const removeProductFromCart = (itemId: CartPurchaseItemId) => {
    dispatch(deleteItem(itemId))
  }

  const clearCart = () => {
    dispatch(clearItems())
  }

  const totalImport = (() => items.reduce((total, item) => total + item.total, 0))()

  return {
    cartPurchase: {
      items,
      totalImport
    },
    addProductToCart,
    removeProductFromCart,
    clearCart
  }
}
export default useCartPurchase
