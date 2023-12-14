import { TransactionsMonth, TransactionsMonthRes } from '@/types'

const formatTransactionsMonth = (res: TransactionsMonthRes): TransactionsMonth => {
  return {
    purchases: res.purchases,
    sales: res.sales
  }
}
export default formatTransactionsMonth
