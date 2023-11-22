import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Login from '@/pages/Login'

async function LoginPage () {
  const session = await getServerSession(authOptions)
  if (session) redirect('/panel')

  return (
    <Login />
  )
}
export default LoginPage
