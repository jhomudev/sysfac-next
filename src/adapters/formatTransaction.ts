import { Transaction, TransactionResponse } from '@/types'

const formatTransaction = (res: TransactionResponse): Transaction => {
  const formatedTransaction: Transaction = {
    id: res.transactionId,
    operationType: res.operationType,
    totalPay: res.totalPay,
    comments: res.comments,
    user: {
      id: res.user.id,
      username: res.user.username,
      fullname: res.user.fullname
    },
    createdAt: res.createdAt
  }

  return formatedTransaction
}

export default formatTransaction
