import { TransactionMonthDB } from '@/types'

const fillMonthsInTransactions = (tran: TransactionMonthDB[]) => {
  // Crear un nuevo array para todos los meses del año
  const allMonths = Array.from({ length: 12 }, (_, index) => index + 1)
  // Filtrar los meses que ya están presentes en el array original
  const missingMonths = allMonths.filter(month => !tran.some(item => item.month === month))
  // Rellenar el array con los meses faltantes
  const newArray = tran.concat(missingMonths.map(month => ({ month, quantity: 0 })))
  // Ordenar el nuevo array por el mes
  newArray.sort((a, b) => a.month - b.month)

  return newArray
}

export default fillMonthsInTransactions
