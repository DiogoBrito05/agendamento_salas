function converterData(data) {

  if (!data) {
    return null
  }

  // formato:
  // 09/05/2026 14:00

  if (data.includes('/')) {

    const [dataParte, horaParte] =
      data.split(' ')

    const [dia, mes, ano] =
      dataParte.split('/')

    return `${ano}-${mes}-${dia}T${horaParte}`
  }

  return data
}

module.exports = {
  converterData
}