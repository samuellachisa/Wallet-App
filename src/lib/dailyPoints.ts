export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

function startOfLocalDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function daysBetweenInclusive(start: Date, end: Date): number {
  const s = startOfLocalDay(start).getTime()
  const e = startOfLocalDay(end).getTime()
  return Math.floor((e - s) / 86_400_000) + 1
}

/** Northern-hemisphere meteorological seasons (per spec examples: Sep 1, Dec 1). */
export function getSeasonAndDayInSeason(d: Date): { season: Season; dayInSeason: number } {
  const y = d.getFullYear()
  const m = d.getMonth() + 1

  if (m >= 3 && m <= 5) {
    const seasonStart = new Date(y, 2, 1)
    return { season: 'spring', dayInSeason: daysBetweenInclusive(seasonStart, d) }
  }
  if (m >= 6 && m <= 8) {
    const seasonStart = new Date(y, 5, 1)
    return { season: 'summer', dayInSeason: daysBetweenInclusive(seasonStart, d) }
  }
  if (m >= 9 && m <= 11) {
    const seasonStart = new Date(y, 8, 1)
    return { season: 'autumn', dayInSeason: daysBetweenInclusive(seasonStart, d) }
  }

  if (m === 12) {
    const seasonStart = new Date(y, 11, 1)
    return { season: 'winter', dayInSeason: daysBetweenInclusive(seasonStart, d) }
  }

  const seasonStart = new Date(y - 1, 11, 1)
  return { season: 'winter', dayInSeason: daysBetweenInclusive(seasonStart, d) }
}

/** Points earned on day `d` within its season (1-based day index). */
export function pointsForDayInSeason(dayInSeason: number): number {
  if (dayInSeason < 1) {
    return 0
  }
  if (dayInSeason === 1) {
    return 2
  }
  if (dayInSeason === 2) {
    return 3
  }
  let prev2 = 2
  let prev1 = 3
  for (let d = 3; d <= dayInSeason; d++) {
    const next = Math.round(prev2 + 0.6 * prev1)
    prev2 = prev1
    prev1 = next
  }
  return prev1
}

export function dailyPointsForDate(d: Date): number {
  const { dayInSeason } = getSeasonAndDayInSeason(d)
  return pointsForDayInSeason(dayInSeason)
}

/** e.g. 28745 → "29K" when over 1000. */
export function formatPointsK(points: number): string {
  if (points <= 1000) {
    return points.toLocaleString('en-US')
  }
  const k = Math.round(points / 1000)
  return `${k}K`
}
