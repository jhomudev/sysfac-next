export const getRelativeTime = (datePassed: string) => {
  const datePassedDate = new Date(datePassed)
  const now = new Date()
  const timeLeft = now.getTime() - datePassedDate.getTime()
  const secondsLeft = Math.floor(timeLeft / 1000)

  if (secondsLeft < 60) {
    return 'Hace un momento'
  } else if (secondsLeft < 3600) {
    const minutesLeft = Math.floor(secondsLeft / 60)
    return `Hace ${minutesLeft} ${minutesLeft === 1 ? 'minuto' : 'minutos'}`
  } else if (secondsLeft < 86400) {
    const hoursLeft = Math.floor(secondsLeft / 3600)
    return `Hace ${hoursLeft} ${hoursLeft === 1 ? 'hora' : 'horas'}`
  } else if (secondsLeft < 604800) {
    const daysLeft = Math.floor(secondsLeft / 86400)
    return `Hace ${daysLeft} ${daysLeft === 1 ? 'día' : 'días'}`
  } else if (secondsLeft < 2419200) {
    const weeksLeft = Math.floor(secondsLeft / 604800)
    return `Hace ${weeksLeft} ${weeksLeft === 1 ? 'semana' : 'semanas'}`
  } else {
    const monthsLeft = Math.floor(secondsLeft / 2419200)
    return `Hace ${monthsLeft} ${monthsLeft === 1 ? 'mes' : 'meses'}`
  }
}
