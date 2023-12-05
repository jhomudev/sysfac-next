// app/providers.tsx
'use client'
import { SessionProvider as SessionNextAuthProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import CartModalProvider from '@/context/CartModalContext'

export function Providers ({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <SessionNextAuthProvider>
        <Provider store={store}>
          <CartModalProvider>
            {children}
          </CartModalProvider>
        </Provider>
      </SessionNextAuthProvider>
    </NextUIProvider>
  )
}
