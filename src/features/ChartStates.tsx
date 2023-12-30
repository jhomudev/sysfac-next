'use client'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJs, ArcElement, Tooltip, Legend, ChartData } from 'chart.js'
import { COLORS_ENT } from '@/contants'
import useSWR from 'swr'
import { fetcher } from '@/libs/swr'
import { formatUnitPerState } from '@/adapters'
import { ApiResponseWithReturn, UnitPerStateRes } from '@/types'
import { Skeleton } from '@nextui-org/react'

ChartJs.register(
  ArcElement,
  Tooltip,
  Legend
)

function ChartStates () {
  const { data: _data, error, isLoading } = useSWR<ApiResponseWithReturn<UnitPerStateRes>>('/api/inventary/states', fetcher)

  if (error) console.log('Error al obtener datos chartStates')
  const dataInventary = _data ? formatUnitPerState(_data.data) : null

  const data: ChartData<'pie'> = {
    labels: ['Vendidos', 'Dañados', 'En stock'],
    datasets: [
      {
        label: 'Cantidad',
        data: dataInventary ? [dataInventary.sold, dataInventary.damaged, dataInventary.stock] : [],
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
    maintainAspectRatio: false
  }

  return !isLoading
    ? <Pie className='!w-full !h-full' data={data} options={options} />
    : <Skeleton className='!w-full !h-full rounded-md' />
}
export default ChartStates
