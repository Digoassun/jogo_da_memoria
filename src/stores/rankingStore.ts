import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { rankingRepository } from '@/repositories/rankingRepository'
import type { RankingEntry } from '@/types/ranking'

export const useRankingStore = defineStore('ranking', () => {
  const entries = ref<RankingEntry[]>(rankingRepository.load())

  const sortedRankingEntries = computed(() => {
    return [...entries.value].sort((a, b) => {
      if (a.moves !== b.moves) return a.moves - b.moves
      return new Date(a.playedAt).getTime() - new Date(b.playedAt).getTime()
    })
  })

  const getEntryPosition = (entryId: string): number | null => {
    const index = sortedRankingEntries.value.findIndex((entry) => entry.id === entryId)
    if (index === -1) return null
    return index + 1
  }

  const addEntry = (playerName: string, moves: number): string => {
    const entry: RankingEntry = {
      id: crypto.randomUUID(),
      playerName,
      moves,
      playedAt: new Date().toISOString(),
    }

    entries.value.push(entry)
    rankingRepository.save(entries.value)

    return entry.id
  }

  return { entries, sortedRankingEntries, getEntryPosition, addEntry }
})
