import { addItem, deleteItem, clearItems } from '@/store/slices/cartPurchaseSlice'
import { CartPurchaseItemId, CartPurchaseItemWhithoutId } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store/storeActions'

const useCartPurchase = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cartPurchase)

  const addProductToCart = (item: CartPurchaseItemWhithoutId) => {
    dispatch(addItem({ itemId: crypto.randomUUID(), ...item }))
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
