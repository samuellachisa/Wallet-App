import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { walletData } from '../data/wallet'
import { dailyPointsForDate, formatPointsK } from '../lib/dailyPoints'
import {
  formatDateWithAuthorizedUser,
  formatPlainCurrency,
  formatTransactionAmount,
  formatTransactionListSubtitle,
  listDescription,
} from '../lib/transactionDisplay'
import { MobileShell } from './MobileShell'
import { TransactionListIcon } from './TransactionListIcon'

/** iOS secondary label (card titles, subtitles, dates). */
const secondaryGray = 'text-[#8e8e93]'
const divider = 'border-[#e5e5ea]'
const cardRadius = 'rounded-[12px]'
const cardShadow = 'shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)]'

function resolveNow(): Date {
  return walletData.referenceDate
    ? new Date(walletData.referenceDate)
    : new Date()
}

export function TransactionsList() {
  const now = resolveNow()
  const available = walletData.cardLimit - walletData.cardBalance
  const computedPoints = formatPointsK(dailyPointsForDate(now))
  const pointsLabel = walletData.dailyPointsDisplay ?? computedPoints
  const rows = walletData.transactions

  return (
    <MobileShell>
      <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-3">
        <section
          className={`col-start-1 row-start-1 ${cardRadius} bg-white p-4 ${cardShadow}`}
        >
          <p className={`text-[13px] font-normal leading-tight ${secondaryGray}`}>
            Card Balance
          </p>
          <p className="mt-1 text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] text-black">
            {formatPlainCurrency(walletData.cardBalance)}
          </p>
          <p className={`mt-1 text-[13px] font-normal leading-tight ${secondaryGray}`}>
            {formatPlainCurrency(available)} Available
          </p>
        </section>

        <section
          className={`col-start-1 row-start-2 ${cardRadius} bg-white p-4 ${cardShadow}`}
        >
          <p className={`text-[13px] font-normal leading-tight ${secondaryGray}`}>Daily Points</p>
          <p
            className={`mt-1.5 text-[22px] font-medium leading-none tracking-[-0.02em] ${secondaryGray}`}
          >
            {pointsLabel}
          </p>
        </section>

        <section
          className="col-start-2 row-span-2 row-start-1 flex min-h-[168px] flex-col justify-between rounded-[16px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div className="min-w-0 pr-1">
            <p className="mb-1 text-[17px] font-semibold leading-[1.2] tracking-[-0.01em] text-black">
              No Payment Due
            </p>
            <p className="text-[13px] font-normal leading-[1.45] text-[#757575]">
              You&apos;ve paid your {walletData.paidMonthName} balance.
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eeeeee] text-black"
              aria-hidden
            >
              <FontAwesomeIcon icon={faCheck} className="text-[15px]" />
            </div>
          </div>
        </section>
      </div>

      <h2 className="mb-2 px-0.5 text-[22px] font-bold leading-tight tracking-[-0.02em] text-black">
        Latest Transactions
      </h2>

      <section className={`overflow-hidden ${cardRadius} bg-white ${cardShadow}`}>
        <ul>
          {rows.map((t, index) => {
            const isLast = index === rows.length - 1
            const rawSubtitle = listDescription(t)
            const subtitle = formatTransactionListSubtitle(rawSubtitle)
            const fromLine = rawSubtitle.trimStart().startsWith('From ')
            return (
              <li key={t.id}>
                <Link
                  to={`/transactions/${encodeURIComponent(t.id)}`}
                  className="flex min-h-[72px] items-stretch gap-3 pl-4 transition-colors active:bg-black/[0.04]"
                >
                  <div className="flex w-10 shrink-0 items-center justify-center self-stretch py-3">
                    <TransactionListIcon transaction={t} />
                  </div>
                  <div
                    className={`flex min-w-0 flex-1 items-stretch border-b py-3 pr-3 ${divider} ${isLast ? 'border-b-0' : ''}`}
                  >
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="min-w-0 flex-1 truncate text-[17px] font-semibold leading-tight tracking-[-0.01em] text-black">
                          {t.name}
                        </p>
                        <span className="shrink-0 text-[17px] font-semibold tabular-nums tracking-[-0.01em] text-black">
                          {formatTransactionAmount(t)}
                        </span>
                      </div>
                      <div className="mt-1 flex min-h-[20px] items-center justify-between gap-2">
                        <p
                          className={`min-w-0 flex-1 text-[15px] font-normal leading-snug ${secondaryGray} ${fromLine ? 'whitespace-nowrap' : 'break-words'}`}
                        >
                          {subtitle}
                        </p>
                        {t.cashbackPercent != null ? (
                          <span
                            className={`ml-2 shrink-0 rounded-md bg-[#e5e5ea] px-[6px] py-[3px] text-[12px] font-medium leading-none text-[#3c3c43]`}
                          >
                            {t.cashbackPercent}%
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={`mt-1 text-[15px] font-normal leading-snug ${secondaryGray}`}
                      >
                        {formatDateWithAuthorizedUser(t.date, now, t.authorizedUser)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center justify-center self-center pl-1">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-[13px] text-[#c7c7cc]"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <div
        className="mx-auto mt-10 h-[5px] w-[134px] shrink-0 rounded-full bg-black"
        aria-hidden
      />
    </MobileShell>
  )
}
