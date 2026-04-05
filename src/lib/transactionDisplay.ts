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

export function formatDetailHeaderDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
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

/** Authorized user appears before the date label (same line, dot-separated). */
export function formatDateWithAuthorizedUser(
  iso: string,
  now: Date,
  authorizedUser?: string,
): string {
  const datePart = formatTransactionListDate(iso, now)
  if (authorizedUser) {
    return `${authorizedUser} · ${datePart}`
  }
  return datePart
}
