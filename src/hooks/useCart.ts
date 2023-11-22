import { TCart, TCartItemId, TCartItemWithoutId, setCart, addItem, deleteItem, gratifyItem, makeDiscount } from '@/context/store/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/context/store/storeActions'

export const IGV = 18 // 18 %

const useCart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)

  const updateCart = (data: TCart) => {
    dispatch(setCart(data))
  }
  const addProductToCart = (item: TCartItemWithoutId) => {
    const alreadyProduct = cart.items.some(itemCart => itemCart.productId === item.productId || itemCart.serialNumber === item.serialNumber)
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

  const removeProductFromCart = (itemId: TCartItemId) => {
    dispatch(deleteItem(itemId))
  }

  const gratifyProduct = (itemId: TCartItemId) => {
    dispatch(gratifyItem(itemId))
  }

  const addDiscount = (discount: number) => {
    dispatch(makeDiscount(discount))
  }

  const _import = cart.items.reduce((total, item) => total + item.total, 0)

  const discount = cart.discount

  const totalImport = (() => {
    const discountInMoney = discount / 100 * _import
    const IGVinMoney = IGV / 100 * _import

    return _import - discountInMoney + IGVinMoney
  })()

  return {
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
