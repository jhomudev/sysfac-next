import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
// import { PT_Sans } from 'next/font/google'
import './globals.css'
import React from 'react'
import { Providers } from './providers'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'
import { NEXTUI_COLORS } from '@/contants'

// const font = PT_Sans({
//   weight: ['400', '700'],
//   subsets: ['latin']
// })

export const metadata: Metadata = {
  title: 'Sysfac',
  description: 'Sistema de ventas e inventario'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='font-ptSans'>
        <Providers>
          <NextTopLoader color={NEXTUI_COLORS.primary} height={5} zIndex={10} />
          <div className='w-full min-h-screen flex flex-col bg-mySoftLight'>
            {children}
            <Toaster position='top-center' reverseOrder />
          </div>
        </Providers>
      </body>
    </html>
  )
}
