import { STORAGE_KEYS } from '@/constants/storageKeys'
import type { RankingEntry } from '@/types/ranking'

export const rankingRepository = {
  save(entries: RankingEntry[]): void {
    localStorage.setItem(STORAGE_KEYS.RANKING, JSON.stringify(entries))
  },

  load(): RankingEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.RANKING)
    if (!raw) return []

    return JSON.parse(raw) as RankingEntry[]
  },
}
