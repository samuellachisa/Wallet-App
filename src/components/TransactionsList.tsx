import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { walletData } from '../data/wallet'
import { dailyPointsForDate, formatPointsK } from '../lib/dailyPoints'
import { iconForKey } from '../lib/faIconMap'
import { iconBackgroundForId } from '../lib/transactionIcon'
import {
  formatDateWithAuthorizedUser,
  formatPlainCurrency,
  formatTransactionAmount,
  listDescription,
} from '../lib/transactionDisplay'
import { MobileShell } from './MobileShell'

function resolveNow(): Date {
  return walletData.referenceDate
    ? new Date(walletData.referenceDate)
    : new Date()
}

export function TransactionsList() {
  const now = resolveNow()
  const available = walletData.cardLimit - walletData.cardBalance
  const points = dailyPointsForDate(now)
  const pointsLabel = formatPointsK(points)
  const rows = walletData.transactions.slice(0, 10)

  return (
    <MobileShell>
      <header className="mb-4">
        <h1 className="text-center text-xl font-semibold tracking-tight text-neutral-900">
          Wallet
        </h1>
      </header>

      <div className="mb-5 grid grid-cols-2 grid-rows-2 gap-3">
        <section className="col-start-1 row-start-1 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Card Balance</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">
            {formatPlainCurrency(walletData.cardBalance)}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {formatPlainCurrency(available)} Available
          </p>
        </section>

        <section className="col-start-1 row-start-2 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Daily Points</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">{pointsLabel}</p>
        </section>

        <section className="col-start-2 row-span-2 row-start-1 flex flex-col items-center justify-center rounded-2xl bg-white p-4 text-center shadow-sm">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FontAwesomeIcon icon={faCircleCheck} className="text-3xl" />
          </div>
          <p className="text-base font-semibold text-neutral-900">No Payment Due</p>
          <p className="mt-1 text-sm text-neutral-500">
            You&apos;ve paid your {walletData.paidMonthName} balance.
          </p>
        </section>
      </div>

      <section className="rounded-2xl bg-white px-2 py-1 shadow-sm">
        <h2 className="border-b border-neutral-100 px-3 py-3 text-base font-semibold text-neutral-900">
          Latest Transactions
        </h2>
        <ul className="divide-y divide-neutral-100">
          {rows.map((t) => (
            <li key={t.id}>
              <Link
                to={`/transactions/${encodeURIComponent(t.id)}`}
                className="flex items-center gap-3 px-3 py-3 text-left transition-colors active:bg-neutral-50"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-white"
                  style={{ backgroundColor: iconBackgroundForId(t.id) }}
                  aria-hidden
                >
                  <FontAwesomeIcon icon={iconForKey(t.iconKey)} className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-neutral-900">{t.name}</p>
                  <p className="truncate text-sm text-neutral-500">{listDescription(t)}</p>
                  <p className="mt-0.5 text-sm text-neutral-400">
                    {formatDateWithAuthorizedUser(t.date, now, t.authorizedUser)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-medium text-neutral-900">
                        {formatTransactionAmount(t)}
                      </span>
                      {t.cashbackPercent != null ? (
                        <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500">
                          {t.cashbackPercent}%
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-sm text-neutral-300"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </MobileShell>
  )
}
