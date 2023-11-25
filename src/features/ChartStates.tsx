'use client'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJs, ArcElement, Tooltip, Legend, ChartData } from 'chart.js'
import { COLORS_ENT } from '@/contants'

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
          `${COLORS_ENT.stateProductUnit.sold.hex}30`,
          `${COLORS_ENT.stateProductUnit.damaged.hex}30`,
          `${COLORS_ENT.stateProductUnit.stock.hex}30`
        ],
        borderColor: [
          COLORS_ENT.stateProductUnit.sold.hex,
          COLORS_ENT.stateProductUnit.damaged.hex,
          COLORS_ENT.stateProductUnit.stock.hex
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
