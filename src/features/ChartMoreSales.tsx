'use client'
import { Bar } from 'react-chartjs-2'
import { NEXTUI_COLORS } from '@/libs/utils'
import { Chart as ChartJs, Filler, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, CategoryScale, BarElement, ChartData } from 'chart.js'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
)

function ChartMoreSales () {
  const data: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Ventas',
        data: [123, 100, 145, 156, 156, 112, 134, 145],
        backgroundColor: `${NEXTUI_COLORS.danger}30`,
        borderColor: NEXTUI_COLORS.danger,
        borderWidth: 2
      },
      {
        label: 'Compras',
        data: [23, 34, 55, 56, 76, 12, 34, 45],
        backgroundColor: `${NEXTUI_COLORS.success}30`,
        borderColor: NEXTUI_COLORS.success,
        borderWidth: 2
      }
    ]
  }
  const options = {
    responsive: true,
    maintainsAspectRatio: false
  }

  return (
    <Bar className='!w-full !h-full' data={data} options={options} />
  )
}
export default ChartMoreSales
