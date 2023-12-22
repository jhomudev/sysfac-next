'use client'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, Filler, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, CategoryScale, ChartData } from 'chart.js'
import { COLORS_ENT } from '@/contants'
import { formatTransactionsMonth } from '@/adapters'
import { ApiResponseWithReturn, TransactionsMonthRes } from '@/types'
import { fetcher } from '@/libs/swr'
import useSWR from 'swr'
import { Skeleton } from '@nextui-org/react'

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

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function ChartTransactions () {
  const { data: _data, error, isLoading } = useSWR<ApiResponseWithReturn<TransactionsMonthRes>>('/api/transactions/months', fetcher)

  if (error) console.log('Error al obtener datos chartTransactions')
  const dataRes = _data ? formatTransactionsMonth(_data.data) : null
  const sales = dataRes ? months.map((_month, i) => dataRes.sales[i] ? dataRes.sales[i].quantity : 0) : []
  const purchases = dataRes ? months.map((_month, i) => dataRes.purchases[i] ? dataRes.purchases[i].quantity : 0) : []

  const data: ChartData<'line'> = {
    labels: months,
    datasets: [
      {
        label: 'Ventas',
        data: sales,
        backgroundColor: `${COLORS_ENT.operationType.sell.hex}30`,
        borderColor: COLORS_ENT.operationType.sell.hex,
        borderWidth: 2,
        pointRadius: 5,
        // fill: true,
        tension: 0.2
      },
      {
        label: 'Compras',
        data: purchases,
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

  return !isLoading
    ? <Line
        className='!w-full !h-full'
        data={data}
        options={options}
      />
    : <Skeleton className='!w-full !h-full rounded-md' />
}
export default ChartTransactions
