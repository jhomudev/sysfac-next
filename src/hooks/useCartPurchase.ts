import { addItem, deleteItem, clearItems } from '@/store/slices/cartPurchaseSlice'
import { CartPurchaseItemId, CartPurchaseItemWhithoutId } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store/storeActions'

const useCartPurchase = () => {
  const dispatch = useAppDispatch()
  const cartPurchase = useAppSelector(state => state.cartPurchase)

  const addProductToCart = (item: CartPurchaseItemWhithoutId) => {
    dispatch(addItem({ itemId: crypto.randomUUID(), ...item }))
  }

  const removeProductFromCart = (itemId: CartPurchaseItemId) => {
    dispatch(deleteItem(itemId))
  }

  const clearCart = () => {
    dispatch(clearItems())
  }

  const getTotalImport = () => cartPurchase.items.reduce((total, item) => total + item.total, 0)

  return {
    addProductToCart,
    removeProductFromCart,
    clearCart,
    getTotalImport
  }
}
export default useCartPurchase
