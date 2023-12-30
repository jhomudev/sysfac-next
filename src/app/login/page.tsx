import FormLogin from '@/modules/Login/components/FormLogin'
import Footer from '@/features/Footer'

async function LoginPage () {
  return (
    <div className='dark bg-myDark flex-1 flex flex-col'>
      <div className='container-block w-full flex-1 flex flex-col gap-3 items-center justify-center'>
        <h1 className='text-3xl text-myLight font-semibold mb-3'>Bienvenido a Sysfac</h1>
        <FormLogin />
      </div>
      <Footer />
    </div>
  )
}
export default LoginPage
