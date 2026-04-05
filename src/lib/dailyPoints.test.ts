import { describe, expect, it } from 'vitest'
import {
  dailyPointsForDate,
  formatPointsK,
  getSeasonAndDayInSeason,
  pointsForDayInSeason,
} from './dailyPoints'

describe('pointsForDayInSeason', () => {
  it('returns 2, 3 for first two days', () => {
    expect(pointsForDayInSeason(1)).toBe(2)
    expect(pointsForDayInSeason(2)).toBe(3)
  })

  it('matches spec example for day 3 (100% d-2 + 60% d-1)', () => {
    expect(pointsForDayInSeason(3)).toBe(Math.round(2 + 0.6 * 3))
  })
})

describe('getSeasonAndDayInSeason', () => {
  it('counts autumn from September 1', () => {
    const d = new Date(2022, 8, 3)
    expect(getSeasonAndDayInSeason(d)).toEqual({ season: 'autumn', dayInSeason: 3 })
  })

  it('counts winter across January using prior December start', () => {
    const d = new Date(2024, 0, 15)
    expect(getSeasonAndDayInSeason(d).season).toBe('winter')
    expect(getSeasonAndDayInSeason(d).dayInSeason).toBeGreaterThan(30)
  })
})

describe('dailyPointsForDate', () => {
  it('aligns with autumn Sept 3 example', () => {
    const d = new Date(2022, 8, 3)
    expect(dailyPointsForDate(d)).toBe(pointsForDayInSeason(3))
  })
})

describe('formatPointsK', () => {
  it('uses K when strictly over 1000', () => {
    expect(formatPointsK(28745)).toBe('29K')
    expect(formatPointsK(1000)).toBe('1,000')
  })
})
