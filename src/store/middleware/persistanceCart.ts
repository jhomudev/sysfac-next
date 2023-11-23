import { Middleware } from '@reduxjs/toolkit'
// import { deleteItem, addItem, gratifyItem } from '../slices/cartSlice'
// import { deleteItem, addItem, clearItems } from '../slices/cartPurchaseSlice'

export const persistanceCart:Middleware = (store) => (next) => (action) => {
  next(action)
  if (typeof window !== 'undefined' && window.localStorage) { localStorage.setItem('__sysfac__store__', JSON.stringify(store.getState())) }
}
