import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import cartPurchaseReducer from './slices/cartPurchaseSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartPurchase: cartPurchaseReducer
  },
  middleware: []
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
