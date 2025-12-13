// utils/formatters.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString()
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}