import type { WalletTransaction } from '../types/wallet'

function startOfLocalDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** List row: relative label within the last 7 days, else M/D/YY. */
export function formatTransactionListDate(iso: string, now: Date): string {
  const tx = new Date(iso)
  const txDay = startOfLocalDay(tx)
  const today = startOfLocalDay(now)
  const diffDays = Math.round((today.getTime() - txDay.getTime()) / 86_400_000)

  if (diffDays === 0) {
    return 'Today'
  }
  if (diffDays === 1) {
    return 'Yesterday'
  }
  if (diffDays >= 2 && diffDays < 7) {
    return tx.toLocaleDateString('en-US', { weekday: 'long' })
  }
  return tx.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
}

/** Receipt-style: `5/26/22, 12:47` (12-hour clock, no AM/PM). */
export function formatDetailHeaderDateTime(iso: string): string {
  const d = new Date(iso)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const year = String(d.getFullYear()).slice(-2)
  const h24 = d.getHours()
  const hour12 = h24 % 12 === 0 ? 12 : h24 % 12
  const minute = String(d.getMinutes()).padStart(2, '0')
  return `${month}/${day}/${year}, ${hour12}:${minute}`
}

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatTransactionAmount(t: WalletTransaction): string {
  const s = money.format(t.amount)
  return t.type === 'payment' ? `+${s}` : s
}

export function formatPlainCurrency(amount: number): string {
  return money.format(amount)
}

export function listDescription(t: WalletTransaction): string {
  const base = t.description
  return t.pending ? `Pending - ${base}` : base
}

/** Apple Wallet list uses an en dash with spaces: `Diana – Yesterday`. */
const EN_DASH = '\u2013'

/** Authorized user before the date (en dash, like the reference screenshot). */
export function formatDateWithAuthorizedUser(
  iso: string,
  now: Date,
  authorizedUser?: string,
): string {
  const datePart = formatTransactionListDate(iso, now)
  if (authorizedUser) {
    return `${authorizedUser} ${EN_DASH} ${datePart}`
  }
  return datePart
}

/** Bank “From …” lines: fixed prefix + ASCII `...` like `From JPMorgan Chase Bank Natio...`. */
export function formatTransactionListSubtitle(text: string): string {
  const s = text.trimStart()
  if (!s.startsWith('From ')) {
    return text
  }
  const max = 30
  if (s.length <= max) {
    return s
  }
  return `${s.slice(0, max)}...`
}
