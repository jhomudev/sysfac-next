import { IGV } from '@/contants'
import { setCart, addItem, deleteItem, gratifyItem, makeDiscount } from '@/store/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/storeActions'
import { Cart, CartItemId, CartItemWithoutId } from '@/types'

const useCart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)

  const updateCart = (data: Cart) => {
    dispatch(setCart(data))
  }

  const addProductToCart = (item: CartItemWithoutId) => {
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
