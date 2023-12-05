import { TransactionFromDB, TransactionResponse } from '@/types'

const formatTransactionResponse = (res: TransactionFromDB): TransactionResponse => {
  const {
    transactionId,
    operationType,
    totalPay,
    comments,
    userId,
    userFullname,
    username,
    createdAt
  } = res
  const transactionFormated: TransactionResponse = {
    transactionId,
    operationType,
    totalPay,
    comments,
    createdAt,
    user: {
      id: userId,
      username,
      fullname: userFullname
    }
  }

  return transactionFormated
}
export default formatTransactionResponse
