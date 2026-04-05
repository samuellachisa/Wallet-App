import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { walletData } from '../data/wallet'
import { iconForKey } from '../lib/faIconMap'
import { iconBackgroundForId } from '../lib/transactionIcon'
import {
  formatDetailHeaderDateTime,
  formatPlainCurrency,
} from '../lib/transactionDisplay'
import { MobileShell } from './MobileShell'

export function TransactionDetail() {
  const { id } = useParams<{ id: string }>()
  const decodedId = id ? decodeURIComponent(id) : ''
  const t = walletData.transactions.find((x) => x.id === decodedId)

  if (!t) {
    return (
      <MobileShell>
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="font-medium text-neutral-900">Transaction not found</p>
          <p className="mt-2 text-sm text-neutral-500">
            This receipt is missing or the link is invalid.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Back to transactions
          </Link>
        </div>
      </MobileShell>
    )
  }

  return (
    <MobileShell>
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        aria-label="Back to transactions"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Back
      </Link>

      <div className="text-center">
        <p className="text-3xl font-bold text-neutral-900">
          {formatPlainCurrency(t.amount)}
        </p>
        <p className="mt-1 text-base text-neutral-500">{t.name}</p>
        <p className="mt-0.5 text-sm text-neutral-500">
          {formatDetailHeaderDateTime(t.date)}
        </p>
        <div
          className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-inner"
          style={{ backgroundColor: iconBackgroundForId(t.id) }}
          aria-hidden
        >
          <FontAwesomeIcon icon={iconForKey(t.iconKey)} className="h-7 w-7" />
        </div>
      </div>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <p className="font-semibold text-neutral-900">Status: {t.status}</p>
        <p className="mt-1 text-sm text-neutral-500">{t.paymentMethod}</p>
        <hr className="my-4 border-neutral-100" />
        <div className="flex items-center justify-between font-semibold text-neutral-900">
          <span>Total</span>
          <span>{formatPlainCurrency(t.amount)}</span>
        </div>

        <dl className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Description</dt>
            <dd className="text-right text-neutral-900">{t.description}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Type</dt>
            <dd className="text-right capitalize text-neutral-900">{t.type}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Pending</dt>
            <dd className="text-right text-neutral-900">{t.pending ? 'Yes' : 'No'}</dd>
          </div>
          {t.authorizedUser ? (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Authorized user</dt>
              <dd className="text-right text-neutral-900">{t.authorizedUser}</dd>
            </div>
          ) : null}
          {t.cashbackPercent != null ? (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Cashback</dt>
              <dd className="text-right text-neutral-900">{t.cashbackPercent}%</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Transaction ID</dt>
            <dd className="break-all text-right text-neutral-900">{t.id}</dd>
          </div>
        </dl>
      </section>
    </MobileShell>
  )
}
