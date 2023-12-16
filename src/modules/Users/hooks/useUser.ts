import { UserToDB } from '@/types'
import { createUser, deleteUser, updateUser } from '../services'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const useUser = () => {
  const { refresh } = useRouter()
  const addUser = async (data: UserToDB) => {
    const res = await createUser(data)
    if (!res?.ok) {
      toast.error('No se pudo crear el usuario')
      return
    }
    toast.success('Usuario creado correctamente')
    refresh()
  }

  const modifyUser = async (userId: number, data: UserToDB) => {
    const res = await updateUser(userId, data)
    if (!res?.ok) {
      toast.error('No se pudo actualizar el usuario')
      return
    }
    toast.success('Usuario actualizado correctamente')
    refresh()
  }

  const removeUser = async (userId: number) => {
    const res = await deleteUser(userId)
    if (!res?.ok) {
      toast.error('No se pudo eliminar el usuario')
      return
    }
    toast.success('Usuario eliminado')
    refresh()
  }

  return { addUser, modifyUser, removeUser }
}

export default useUser
