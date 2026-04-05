/** Stable dark tile background from transaction id (HSL). */
export function iconBackgroundForId(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0
  }
  const hue = h % 360
  return `hsl(${hue} 42% 24%)`
}
