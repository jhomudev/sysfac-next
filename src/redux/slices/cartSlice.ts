import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TCartItemId = ReturnType<typeof crypto.randomUUID>

export type TCartItemWithoutId = {
  productId: number,
  product: string,
  serialNumber: string,
  unitPrice: number,
  quantity: number,
  total: number
}

export type TCartItem = {
  itemId: TCartItemId,
} & TCartItemWithoutId

export type TCart = {
  items: TCartItem[],
  discount: number,
  // import: number,
  // totalImport: number
}

const defaultState: TCart = {
  items: [],
  discount: 0.00
  // import: 0.00
  // totalImport: 0.00
}

const dataInLocalStorage = (typeof window !== 'undefined' && window.localStorage) && localStorage.getItem('__sysfac__store__')

const initialState: TCart = /* dataInLocalStorage ? JSON.parse(dataInLocalStorage).cart : */ defaultState

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (_state, action: PayloadAction<TCart>) => {
      return action.payload
    },
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const newItem = action.payload
      state.items.push(newItem)
    },
    deleteItem: (state, action: PayloadAction<TCartItemId>) => {
      const itemId = action.payload
      const itemsCart = state.items.filter(item => item.itemId !== itemId)
      state.items = itemsCart
    },
    gratifyItem: (state, action: PayloadAction<TCartItemId>) => {
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
