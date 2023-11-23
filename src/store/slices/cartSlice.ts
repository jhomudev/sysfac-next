import { Cart, CartItem, CartItemId } from '@/types/Cart'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const defaultState: Cart = {
  items: [],
  discount: 0.00
  // import: 0.00
  // totalImport: 0.00
}

const dataInLocalStorage = (typeof window !== 'undefined' && window.localStorage) && localStorage.getItem('__sysfac__store__')

const initialState: Cart = /* dataInLocalStorage ? JSON.parse(dataInLocalStorage).cart : */ defaultState

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (_state, action: PayloadAction<Cart>) => {
      return action.payload
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      state.items.push(newItem)
    },
    deleteItem: (state, action: PayloadAction<CartItemId>) => {
      const itemId = action.payload
      const itemsCart = state.items.filter(item => item.itemId !== itemId)
      state.items = itemsCart
    },
    gratifyItem: (state, action: PayloadAction<CartItemId>) => {
      const itemId = action.payload
      const indexItemIncart = state.items.findIndex(item => item.itemId === itemId)
      state.items[indexItemIncart].total = 0.00
    },
    makeDiscount: (state, action: PayloadAction<number>) => {
      const discount = action.payload
      state.discount = discount
    }
  }
})

export default cartSlice.reducer
export const { addItem, deleteItem, gratifyItem, makeDiscount, setCart } = cartSlice.actions
