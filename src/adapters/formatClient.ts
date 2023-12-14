import { Client, ClientFromDB } from '@/types'

const formatClient = (res: ClientFromDB): Client => {
  const formatedClient: Client = {
    id: res.clientId,
    dni: res.dni,
    ruc: res.ruc,
    names: res.names,
    lastnames: res.lastnames,
    address: res.address,
    phone: res.phone,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  }

  return formatedClient
}

export default formatClient
