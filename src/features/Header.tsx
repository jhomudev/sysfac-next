'use client'
import { useSession } from 'next-auth/react'

function Header () {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className='flex items-center h-[5rem] bg-myLight rounded-xl p-5 text-myDark'>
      <span>Hola <strong>{user?.names}</strong></span>
    </header>
  )
}
export default Header
