const formatDate = (dateToFormat: string) => {
  const date = new Date(dateToFormat)
  // Obtener día, mes y year
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  // Formatear la fecha en letra como: 13 Jun, 2023
  const dateLetter = `${day} ${month}, ${year}`

  // Formatear la fecha con el formato: 13-06-2023
  const dateShort = `${day}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${year}`

  // Retornar un objeto con ambas formas de la fecha
  return {
    dateLetter,
    dateShort
  }
}

export default formatDate
