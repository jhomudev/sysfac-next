'use client'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, Filler, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, CategoryScale, BarElement, ChartData } from 'chart.js'
import { COLORS_ENT } from '@/contants'

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
        backgroundColor: `${COLORS_ENT.operationType.sell.hex}30`,
        borderColor: COLORS_ENT.operationType.sell.hex,
        borderWidth: 2
      },
      {
        label: 'Compras',
        data: [23, 34, 55, 56, 76, 12, 34, 45],
        backgroundColor: `${COLORS_ENT.operationType.buy.hex}30`,
        borderColor: COLORS_ENT.operationType.buy.hex,
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
