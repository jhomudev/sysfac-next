import CardGraphic from '@/components/CardGraphic'
import ListCardEntity from '@/components/ListCardEntity'
import ChartMoreSales from '@/features/ChartMoreSales'
import ChartStates from '@/features/ChartStates'
import ChartTransactions from '@/features/ChartTransactions'
import ListTransactions from '@/modules/Transactions/components/ListTransactions'

function DashboardPage () {
  return (
    <>
      <h1 className='title-main'>Dashboard</h1>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap gap-5'>
          <ListCardEntity items={['users', 'clients', 'products', 'transactions']} />
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <CardGraphic
            className='w-full p-4 max-h-[500px] xl:max-h-[588px]'
            title='Análisis de movimientos'
            description='El gráfico muestra las ventas y compras mensuales a lo largo del tiempo. Puede ver cómo las transacciones han variado mes a mes.'
          >
            <ChartTransactions />
          </CardGraphic>
          <ListTransactions showRedirect />
        </div>
        <div className='flex flex-col lg:flex-row gap-5'>
          <CardGraphic
            className='w-full lg:w-[35%] p-4 max-h-[588px]'
            title='Gráfico por estados'
            description='Observa la cantidad de productos correspondiente a cada estado'
          >
            <ChartStates />
          </CardGraphic>
          <CardGraphic
            className='w-full lg:w-[65%] p-4 max-h-[588px]'
            title='Productos más vendidos'
            description='Verifique los productos más con más ventas.'
          >
            <ChartMoreSales />
          </CardGraphic>
        </div>
      </div>
    </>
  )
}
export default DashboardPage
