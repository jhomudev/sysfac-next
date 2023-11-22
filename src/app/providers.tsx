// app/providers.tsx
'use client'
import { SessionProvider as SessionNextAuthProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Provider } from 'react-redux'
import { store } from '@/context/store/configureStore'
// import { useAppSelector } from '@/context/store/storeActions'

export function Providers ({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // const [cart, cartPurchase] = useAppSelector(store => [store.cart, store.cartPurchase])

  // React.useEffect(() => {
  //   if (typeof window !== 'undefined' && window.localStorage) { localStorage.setItem('__sysfac__store__', JSON.stringify(store.getState())) }
  // }, [cart, cartPurchase])

  return (
    <NextUIProvider navigate={router.push}>
      <SessionNextAuthProvider>
        <Provider store={store}>
          {children}
        </Provider>
      </SessionNextAuthProvider>
    </NextUIProvider>
  )
}
