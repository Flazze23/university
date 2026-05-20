export const formatUAH = (value: number): string =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0
  }).format(value)

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('uk-UA').format(value)

export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(iso))
