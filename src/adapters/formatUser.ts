import { User, UserFromDB } from '@/types'

const formatUser = (user: UserFromDB) => {
  const formatedUser: User = {
    id: user.userId,
    username: user.username,
    names: user.names,
    lastnames: user.lastnames,
    email: user.email,
    phone: user.phone,
    type: user.type,
    state: user.state,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return formatedUser
}

export default formatUser
