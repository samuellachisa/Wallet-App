export type TransactionType = 'expense' | 'payment'

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
  status: string
  paymentMethod: string
}

export type WalletData = {
  cardLimit: number
  cardBalance: number
  paidMonthName: string
  referenceDate?: string
  transactions: WalletTransaction[]
}
