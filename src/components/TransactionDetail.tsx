import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { walletData } from '../data/wallet'
import {
  formatDetailHeaderDateTime,
  formatPlainCurrency,
} from '../lib/transactionDisplay'
import { MobileShell } from './MobileShell'

const iosBlue = 'text-[#007AFF]'
const labelGray = 'text-[#8e8e93]'
const cardRadius = 'rounded-[12px]'
const cardShadow = 'shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)]'

export function TransactionDetail() {
  const { id } = useParams<{ id: string }>()
  const decodedId = id ? decodeURIComponent(id) : ''
  const t = walletData.transactions.find((x) => x.id === decodedId)

  if (!t) {
    return (
      <MobileShell>
        <div className={`${cardRadius} bg-white p-6 text-center ${cardShadow}`}>
          <p className="font-semibold text-black">Transaction not found</p>
          <p className={`mt-2 text-[15px] font-normal ${labelGray}`}>
            This receipt is missing or the link is invalid.
          </p>
          <Link
            to="/"
            className={`mt-6 inline-flex items-center justify-center ${iosBlue}`}
            aria-label="Back to transactions"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-2xl" />
          </Link>
        </div>
      </MobileShell>
    )
  }

  return (
    <MobileShell>
      <div className="relative flex min-h-[calc(100dvh-2rem)] flex-col">
        <header className="relative z-10 mb-6 h-11 shrink-0">
          <Link
            to="/"
            className={`absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-center p-2 pl-0 ${iosBlue}`}
            aria-label="Back to transactions"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-2xl" />
          </Link>
        </header>

        <div className="flex flex-1 flex-col px-0.5">
          <div className="text-center">
            <p className="text-[40px] font-bold leading-none tracking-[-0.03em] text-black">
              {formatPlainCurrency(t.amount)}
            </p>
            <p className={`mt-2 text-[17px] font-normal leading-snug ${labelGray}`}>
              {t.name}
            </p>
            <p className={`mt-1 text-[15px] font-normal leading-snug ${labelGray}`}>
              {formatDetailHeaderDateTime(t.date)}
            </p>
          </div>

          <section className={`mt-10 ${cardRadius} bg-white px-4 py-5 ${cardShadow}`}>
            <p className="text-[17px] font-bold leading-snug text-black">
              Status: {t.status}
            </p>
            <p className={`mt-1.5 text-[15px] font-normal leading-snug ${labelGray}`}>
              {t.paymentMethod}
            </p>
            <hr className="my-5 border-[#e5e5ea]" />
            <div className="flex items-center justify-between text-[17px] font-bold text-black">
              <span>Total</span>
              <span className="tabular-nums">{formatPlainCurrency(t.amount)}</span>
            </div>
          </section>

          <div className="mt-auto flex flex-1 flex-col justify-end pt-12">
            <div
              className="mx-auto h-[5px] w-[134px] shrink-0 rounded-full bg-black"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </MobileShell>
  )
}
