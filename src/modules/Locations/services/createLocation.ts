import { ApiResponse, LocationToDB } from '@/types'
import axios from 'axios'

const createLocation = async (data: LocationToDB) => {
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/locations`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default createLocation
