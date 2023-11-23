'use client'
import { Pie } from 'react-chartjs-2'
import { NEXTUI_COLORS } from '@/libs/utils'
import { Chart as ChartJs, ArcElement, Tooltip, Legend, ChartData } from 'chart.js'

ChartJs.register(
  ArcElement,
  Tooltip,
  Legend
)

function ChartStates () {
  const data: ChartData<'pie'> = {
    labels: ['Vendidos', 'Dañados', 'En stock'],
    datasets: [
      {
        label: 'Cantidad',
        data: [123, 100, 145],
        backgroundColor: [
          `${NEXTUI_COLORS.success}30`,
          `${NEXTUI_COLORS.danger}30`,
          `${NEXTUI_COLORS.primary}30`
        ],
        borderColor: [
          NEXTUI_COLORS.success,
          NEXTUI_COLORS.danger,
          NEXTUI_COLORS.primary
        ],
        borderWidth: 2
      }
    ]
  }
  const options = {
    responsive: true,
    maintainsAspectRatio: false
  }

  return (
    <Pie className='!w-full !h-full' data={data} options={options} />
  )
}
export default ChartStates
