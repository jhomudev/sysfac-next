import { CartPurchase, CartPurchaseItem, CartPurchaseItemId } from '@/types/CartPurchase'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const defaultState:CartPurchase = {
  items: [],
  totalImport: 0.00
}

const dataInLocalStorage = (typeof window !== 'undefined' && window.localStorage) && localStorage.getItem('__sysfac__store__')

const initialState:CartPurchase = /* dataInLocalStorage ? JSON.parse(dataInLocalStorage).cartPurchase :  */defaultState

const cartPurchaseSlice = createSlice({
  name: 'cartPurchase',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartPurchaseItem>) => {
      const newItem = action.payload
      state.items.push(newItem)
    },
    deleteItem: (state, action:PayloadAction<CartPurchaseItemId>) => {
      const itemId = action.payload
      const itemsCart = state.items.filter(item => item.itemId !== itemId)
      state.items = itemsCart
    },
    clearItems: () => {
      return defaultState
    }
  }
})

export default cartPurchaseSlice.reducer
export const { addItem, deleteItem, clearItems } = cartPurchaseSlice.actions
