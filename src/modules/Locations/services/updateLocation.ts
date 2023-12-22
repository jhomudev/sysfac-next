import { ApiResponse, LocationToDB } from '@/types'
import axios from 'axios'

const updateLocation = async (localId: number, data: LocationToDB) => {
  try {
    const res = await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/locations/${localId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default updateLocation
