'use client'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, Filler, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, CategoryScale, BarElement, ChartData } from 'chart.js'
import { COLORS_ENT } from '@/contants'
import useSWR from 'swr'
import { ApiResponseWithReturn, BestProductsRes } from '@/types'
import { fetcher } from '@/libs/swr'
import { formatBestProducts } from '@/adapters'

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
  const { data: _data, error } = useSWR<ApiResponseWithReturn<BestProductsRes>>('/api/products/best', fetcher)

  if (error) console.log('Error al obtener datos chartTransactions')
  const dataRes = _data ? formatBestProducts(_data.data) : null
  const products: string[] = []
  const total: number[] = []
  dataRes?.bestPersales?.forEach((product) => {
    if (product.totalOperations > 0) {
      products.push(product.product)
      total.push(product.totalOperations)
    }
  })

  const data: ChartData<'bar'> = {
    labels: products.map(item => item.slice(0, 17) + '...'),
    datasets: [
      {
        label: 'Mas vendidos',
        data: total,
        backgroundColor: `${COLORS_ENT.operationType.sell.hex}30`,
        borderColor: COLORS_ENT.operationType.sell.hex,
        borderWidth: 2
      }
      // {
      //   label: 'Compras',
      //   data: [23, 34, 55, 56, 76, 12, 34, 45],
      //   backgroundColor: `${COLORS_ENT.operationType.buy.hex}30`,
      //   borderColor: COLORS_ENT.operationType.buy.hex,
      //   borderWidth: 2
      // }
    ]
  }

  return (
    <Bar
      className='!w-full !h-full' data={data} options={{
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y'
      }}
    />
  )
}
export default ChartMoreSales
