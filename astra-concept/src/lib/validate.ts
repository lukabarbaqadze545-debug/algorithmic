export function isValidPhone(value: string): boolean {
  const cleaned = value.trim()
  if (!/^\+?[\d\s()\-]+$/.test(cleaned)) return false
  const digits = cleaned.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}
