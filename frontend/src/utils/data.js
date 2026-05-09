function formatarData(data) {

  if (!data) {
    return ''
  }

  // ajusta formato SQLite
  const dataFormatada =
    data.replace(' ', 'T')

  const novaData =
    new Date(dataFormatada)

  if (
    isNaN(novaData.getTime())
  ) {

    return data
  }

  return novaData.toLocaleString(
    'pt-BR',
    {

      day: '2-digit',
      month: '2-digit',
      year: 'numeric',

      hour: '2-digit',
      minute: '2-digit'

    }
  )
}

export {
  formatarData
}