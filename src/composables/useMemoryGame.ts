import { computed, reactive, watch } from 'vue'
import { CARDS } from '@/data/cards'
import type { BoardCard } from '@/types/card'

type MemoryGameCallbacks = {
  onTurnComplete?: () => void
  onGameComplete?: () => void
}

export const useMemoryGame = (callbacks?: MemoryGameCallbacks) => {
  const boardCards = computed<BoardCard[]>(() => {
    return [...CARDS, ...CARDS].map((card, id) => ({ ...card, id })).sort(() => Math.random() - 0.5)
  })

  const isFacingUp = reactive<number[]>([])
  const matchedIds = reactive<number[]>([])

  const isMatch = (cards: BoardCard[]) => {
    const first = cards[0]
    const second = cards[1]
    if (!first || !second) return false
    return first.value === second.value
  }

  const isCardVisible = (card: BoardCard) => {
    return matchedIds.includes(card.id) || isFacingUp.includes(card.id)
  }

  const isGameComplete = computed(
    () => matchedIds.length === boardCards.value.length && boardCards.value.length > 0,
  )

  const onCardClick = (card: BoardCard) => {
    if (matchedIds.includes(card.id)) return
    if (isFacingUp.includes(card.id)) return
    if (isFacingUp.length >= 2) return

    isFacingUp.push(card.id)
  }

  watch(isFacingUp, (facingUpIds) => {
    if (facingUpIds.length !== 2) return

    callbacks?.onTurnComplete?.()

    const selectedCards = facingUpIds
      .map((id) => boardCards.value.find((card) => card.id === id))
      .filter((card): card is BoardCard => card !== undefined)

    if (selectedCards.length !== 2) return

    if (isMatch(selectedCards)) {
      matchedIds.push(...facingUpIds)
      isFacingUp.length = 0
      return
    }

    setTimeout(() => {
      isFacingUp.length = 0
    }, 1500)
  })

  watch(isGameComplete, (complete) => {
    if (complete) {
      callbacks?.onGameComplete?.()
    }
  })

  return {
    boardCards,
    isCardVisible,
    onCardClick,
  }
}
