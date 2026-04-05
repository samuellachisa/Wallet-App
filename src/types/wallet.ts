export type TransactionType = 'expense' | 'payment'

/** List row icon treatment (reference UI); omit for hashed fallback. */
export type TransactionTileVariant =
  | 'appleDark'
  | 'paymentGradient'
  | 'ikea'
  | 'target'
  | 'hashed'

export type WalletTransaction = {
  id: string
  name: string
  description: string
  amount: number
  type: TransactionType
  date: string
  pending: boolean
  authorizedUser?: string
  cashbackPercent?: number
  iconKey: string
  /** Visual tile on the list screen; defaults to hashed dark tile + iconKey. */
  tileVariant?: TransactionTileVariant
  status: string
  paymentMethod: string
}

export type WalletData = {
  cardLimit: number
  cardBalance: number
  paidMonthName: string
  referenceDate?: string
  /** When set, list shows this label for Daily Points (e.g. reference screenshot). */
  dailyPointsDisplay?: string
  transactions: WalletTransaction[]
}
