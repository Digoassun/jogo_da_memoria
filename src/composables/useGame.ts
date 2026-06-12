import { computed, onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { CARD_IMAGE_URLS } from '@/constants/cardAssets'
import { CARDS } from '@/data/cards'
import { useGameStore } from '@/stores/gameStore'
import { useRankingStore } from '@/stores/rankingStore'
import { useUserStore } from '@/stores/userStore'
import type { BoardCard } from '@/types/card'
import { preloadImages } from '@/utils/preloadImages'

export const useGame = () => {
  const router = useRouter()
  const gameStore = useGameStore()
  const rankingStore = useRankingStore()
  const userStore = useUserStore()
  const { moves } = storeToRefs(gameStore)
  const { playerName } = storeToRefs(userStore)

  const showVictoryModal = ref(false)
  const lastEntryId = ref<string | null>(null)
  const isAssetsReady = ref(false)

  const boardCards = computed<BoardCard[]>(() => {
    return [...CARDS, ...CARDS].map((card, id) => ({ ...card, id })).sort(() => Math.random() - 0.5)
  })

  const isFacingUp = reactive<number[]>([])
  const matchedIds = reactive<number[]>([])
  const mismatchIds = reactive<number[]>([])

  const totalPairs = CARDS.length

  const matchedPairsCount = computed(() => matchedIds.length / 2)

  const isMatch = (cards: BoardCard[]) => {
    const first = cards[0]
    const second = cards[1]
    if (!first || !second) return false
    return first.value === second.value
  }

  const isCardVisible = (card: BoardCard) => {
    return matchedIds.includes(card.id) || isFacingUp.includes(card.id)
  }

  const isCardMatched = (card: BoardCard) => matchedIds.includes(card.id)

  const isCardMismatch = (card: BoardCard) => mismatchIds.includes(card.id)

  const isGameComplete = computed(
    () => matchedIds.length === boardCards.value.length && boardCards.value.length > 0,
  )

  const handleVictory = () => {
    if (gameStore.isFinished) return

    gameStore.finishGame()
    lastEntryId.value = rankingStore.addEntry(playerName.value, gameStore.moves)
    showVictoryModal.value = true
  }

  const handleCardClick = (card: BoardCard) => {
    if (!isAssetsReady.value) return
    if (matchedIds.includes(card.id)) return
    if (isFacingUp.includes(card.id)) return
    if (isFacingUp.length >= 2) return

    isFacingUp.push(card.id)
  }

  watch(isFacingUp, (facingUpIds) => {
    if (facingUpIds.length !== 2) return

    gameStore.incrementMove()

    const selectedCards = facingUpIds
      .map((id) => boardCards.value.find((card) => card.id === id))
      .filter((card): card is BoardCard => card !== undefined)

    if (selectedCards.length !== 2) return

    if (isMatch(selectedCards)) {
      matchedIds.push(...facingUpIds)
      isFacingUp.length = 0
      return
    }

    mismatchIds.splice(0, mismatchIds.length, ...facingUpIds)

    setTimeout(() => {
      isFacingUp.length = 0
      mismatchIds.length = 0
    }, 1500)
  })

  watch(isGameComplete, (complete) => {
    if (complete) {
      handleVictory()
    }
  })

  onMounted(async () => {
    gameStore.resetGame()
    await preloadImages(CARD_IMAGE_URLS)
    isAssetsReady.value = true
  })

  const handleGoHome = () => {
    userStore.clearPlayer()
    router.push('/')
  }

  const handleVictoryGoHome = () => {
    showVictoryModal.value = false
    handleGoHome()
  }

  return {
    boardCards,
    isCardVisible,
    isCardMatched,
    isCardMismatch,
    matchedPairsCount,
    totalPairs,
    onCardClick: handleCardClick,
    isAssetsReady,
    playerName,
    moves,
    showVictoryModal,
    lastEntryId,
    handleGoHome,
    handleVictoryGoHome,
  }
}
