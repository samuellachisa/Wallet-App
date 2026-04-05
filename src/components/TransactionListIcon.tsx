import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import type { WalletTransaction } from '../types/wallet'
import { iconForKey } from '../lib/faIconMap'
import { iconBackgroundForId } from '../lib/transactionIcon'

/**
 * Apple Card payment tile — warm yellow (top-right), pink/orange band, violet (bottom-left).
 */
const PAYMENT_GRADIENT = [
  'radial-gradient(ellipse 130% 140% at 88% -5%, #fffde7 0%, #ffea00 12%, rgba(255, 204, 0, 0.65) 35%, transparent 55%)',
  'radial-gradient(ellipse 90% 100% at -5% 105%, #5e5ce6 0%, rgba(147, 51, 234, 0.5) 40%, transparent 58%)',
  'linear-gradient(145deg, #6366f1 0%, #9333ea 22%, #db2777 42%, #f97316 62%, #fbbf24 82%, #fef08a 100%)',
].join(', ')

const TILE = 'h-10 w-10 shrink-0 rounded-[9px]'

type TransactionListIconProps = {
  transaction: WalletTransaction
}

export function TransactionListIcon({ transaction: t }: TransactionListIconProps) {
  const variant = t.tileVariant ?? 'hashed'

  if (variant === 'appleDark') {
    return (
      <div
        className={`flex ${TILE} items-center justify-center bg-[#2c2c2e] text-white`}
        aria-hidden
      >
        <FontAwesomeIcon icon={faApple} className="h-[20px] w-[20px]" />
      </div>
    )
  }

  if (variant === 'paymentGradient') {
    return (
      <div
        className={`flex ${TILE} items-center justify-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.12)]`}
        style={{ background: PAYMENT_GRADIENT }}
        aria-hidden
      >
        <FontAwesomeIcon
          icon={faApple}
          className="h-[20px] w-[20px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        />
      </div>
    )
  }

  if (variant === 'ikea') {
    return (
      <div
        className={`flex ${TILE} items-center justify-center bg-[#0058ab]`}
        aria-hidden
      >
        <span className="text-[10px] font-bold leading-none tracking-[0.06em] text-[#ffdb00]">
          IKEA
        </span>
      </div>
    )
  }

  if (variant === 'target') {
    return (
      <div
        className={`flex ${TILE} items-center justify-center border border-[#e5e5ea] bg-white text-[#e82127]`}
        aria-hidden
      >
        <FontAwesomeIcon icon={faBullseye} className="h-[21px] w-[21px]" />
      </div>
    )
  }

  return (
    <div
      className={`flex ${TILE} items-center justify-center text-white`}
      style={{ backgroundColor: iconBackgroundForId(t.id) }}
      aria-hidden
    >
      <FontAwesomeIcon icon={iconForKey(t.iconKey)} className="h-5 w-5" />
    </div>
  )
}
