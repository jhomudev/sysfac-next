'use client'
import Header from '@/features/Header'
import MenuBar from '@/features/MenuBar'
import { Card } from '@nextui-org/react'
// import { Button } from '@nextui-org/react'
// import { signOut, useSession } from 'next-auth/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function PanelLayout ({ children }: Props) {
  // const { data: session } = useSession()
  return (
    <div className='w-full max-h-screen overflow-hidden flex-1 flex gap-5 p-3'>
      <div className='w-[min(20%,300px)]'>
        <MenuBar />
      </div>
      <div className='flex-1 flex flex-col gap-5 overflow-auto'>
        <Header />
        <main className='flex-1 flex'>
          <Card className='flex-1 p-5'>
            {children}
          </Card>
        </main>
      </div>
      {/* <Button onClick={() => { signOut() }} variant='shadow' color='danger'>Salir</Button>
      <pre>
        {
          JSON.stringify(session, null, 2)
        }
      </pre> */}
    </div>
  )
}
export default PanelLayout
