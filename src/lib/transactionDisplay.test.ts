import { describe, expect, it } from 'vitest'
import type { WalletTransaction } from '../types/wallet'
import {
  formatDateWithAuthorizedUser,
  formatTransactionAmount,
  formatTransactionListDate,
  listDescription,
} from './transactionDisplay'

function tx(partial: Partial<WalletTransaction>): WalletTransaction {
  return {
    id: 'x',
    name: 'N',
    description: 'Desc',
    amount: 10,
    type: 'expense',
    date: new Date(2026, 3, 4, 12, 0, 0).toISOString(),
    pending: false,
    iconKey: 'store',
    status: 'Approved',
    paymentMethod: 'Card',
    ...partial,
  }
}

describe('formatTransactionListDate', () => {
  const now = new Date(2026, 3, 5, 10, 0, 0)

  it('shows Yesterday for prior calendar day', () => {
    const iso = new Date(2026, 3, 4, 8, 0, 0).toISOString()
    expect(formatTransactionListDate(iso, now)).toBe('Yesterday')
  })

  it('shows weekday for 2–6 days ago', () => {
    const iso = new Date(2026, 3, 1, 8, 0, 0).toISOString()
    expect(formatTransactionListDate(iso, now)).toBe('Wednesday')
  })

  it('shows numeric date when older than a week', () => {
    const iso = new Date(2022, 9, 1, 8, 0, 0).toISOString()
    expect(formatTransactionListDate(iso, now)).toMatch(/10\/1\/22/)
  })
})

describe('listDescription', () => {
  it('prefixes Pending', () => {
    expect(listDescription(tx({ pending: true, description: 'Card' }))).toBe(
      'Pending - Card',
    )
  })
})

describe('formatTransactionAmount', () => {
  it('adds plus for payments', () => {
    expect(formatTransactionAmount(tx({ type: 'payment', amount: 174 }))).toMatch(/^\+\$174\.00$/)
  })
})

describe('formatDateWithAuthorizedUser', () => {
  const now = new Date(2026, 3, 5, 10, 0, 0)

  it('includes authorized user before date', () => {
    const iso = new Date(2026, 3, 4, 8, 0, 0).toISOString()
    expect(formatDateWithAuthorizedUser(iso, now, 'Alex Kim')).toBe(
      'Alex Kim · Yesterday',
    )
  })
})
