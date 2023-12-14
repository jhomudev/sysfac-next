import formatLocation from '@/adapters/formatLocation'
import { API_URL } from '@/contants'
import { ApiResponseWithReturn, Location, LocationFromDB } from '@/types'
import axios from 'axios'

const getLocationById = async (id: `${number}` | number): Promise<Location | void> => {
  try {
    const res = await axios<ApiResponseWithReturn<LocationFromDB>>(`${API_URL}/locations/${id}`)
    const { data } = res
    if (!data.ok) {
      console.error(data.message)
      return
    }

    const formatedLocation = formatLocation(data.data)

    return formatedLocation
  } catch (error) {
    console.error(error)
  }
}
export default getLocationById
