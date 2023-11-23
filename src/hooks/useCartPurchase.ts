import { TCartPurchaseItemWhithoutId, TCartPurchaseItemId, addItem, deleteItem, clearItems } from '@/redux/slices/cartPurchaseSlice'
import { useAppDispatch, useAppSelector } from '@/redux/storeActions'

const useCartPurchase = () => {
  const dispatch = useAppDispatch()
  const cartPurchase = useAppSelector(state => state.cartPurchase)

  const addProductToCart = (item: TCartPurchaseItemWhithoutId) => {
    dispatch(addItem({ itemId: crypto.randomUUID(), ...item }))
  }

  const removeProductFromCart = (itemId: TCartPurchaseItemId) => {
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
