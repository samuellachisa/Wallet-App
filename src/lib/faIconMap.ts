import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import {
  faBagShopping,
  faBasketShopping,
  faBullseye,
  faBuildingColumns,
  faCartShopping,
  faCirclePlay,
  faGasPump,
  faMugHot,
  faPlane,
  faReceipt,
  faStore,
} from '@fortawesome/free-solid-svg-icons'

const map = {
  apple: faApple,
  bank: faBuildingColumns,
  store: faStore,
  bullseye: faBullseye,
  mug: faMugHot,
  cart: faCartShopping,
  plane: faPlane,
  gas: faGasPump,
  basket: faBasketShopping,
  play: faCirclePlay,
  bag: faBagShopping,
} satisfies Record<string, IconDefinition>

export function iconForKey(iconKey: string): IconDefinition {
  const k = iconKey.toLowerCase()
  return map[k as keyof typeof map] ?? faReceipt
}
