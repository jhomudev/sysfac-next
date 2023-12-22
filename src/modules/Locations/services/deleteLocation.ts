import { ApiResponse } from '@/types'
import axios from 'axios'

const deleteLocation = async (localId: number) => {
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/locations/${localId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default deleteLocation
