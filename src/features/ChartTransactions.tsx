'use client'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, Filler, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, CategoryScale, ChartData } from 'chart.js'
import { COLORS_ENT } from '@/contants'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function ChartTransactions () {
  const data: ChartData<'line'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ventas',
        data: [123, 100, 145, 156, 156, 112, 134, 145],
        backgroundColor: `${COLORS_ENT.operationType.sell.hex}30`,
        borderColor: COLORS_ENT.operationType.sell.hex,
        borderWidth: 2,
        pointRadius: 5,
        // fill: true,
        tension: 0.2
      },
      {
        label: 'Compras',
        data: [23, 34, 55, 56, 76, 12, 34, 45],
        backgroundColor: `${COLORS_ENT.operationType.buy.hex}30`,
        borderColor: COLORS_ENT.operationType.buy.hex,
        borderWidth: 2,
        pointRadius: 5,
        // fill: true,
        tension: 0.2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainsAspectRatio: false
  }

  return (
    <Line
      className='!w-full !h-full'
      data={data}
      options={options}
    />
  )
}
export default ChartTransactions
