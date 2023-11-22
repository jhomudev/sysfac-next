import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TCartPurchaseItemId = ReturnType<typeof crypto.randomUUID>

export type TCartPurchaseItemWhithoutId = {
  productId: number,
  product: string,
  serialNumber: string,
  cost: number,
  priceSale: number,
  quantity: number,
  total: number
}

export type TCartPurchaseItem = {
  itemId: TCartPurchaseItemId
} & TCartPurchaseItemWhithoutId

export type TCartPurchase = {
  items: TCartPurchaseItem[],
  totalImport: number
}

const defaultState:TCartPurchase = {
  items: [],
  totalImport: 0.00
}

const dataInLocalStorage = (typeof window !== 'undefined' && window.localStorage) && localStorage.getItem('__sysfac__store__')

const initialState:TCartPurchase = /* dataInLocalStorage ? JSON.parse(dataInLocalStorage).cartPurchase :  */defaultState

const cartPurchaseSlice = createSlice({
  name: 'cartPurchase',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartPurchaseItem>) => {
      const newItem = action.payload
      state.items.push(newItem)
    },
    deleteItem: (state, action:PayloadAction<TCartPurchaseItemId>) => {
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
