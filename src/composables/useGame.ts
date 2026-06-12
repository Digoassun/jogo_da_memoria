import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { CARD_IMAGE_URLS } from '@/constants/cardAssets'
import { useMemoryGame } from '@/composables/useMemoryGame'
import { useGameStore } from '@/stores/gameStore'
import { useRankingStore } from '@/stores/rankingStore'
import { useUserStore } from '@/stores/userStore'
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

  const handleVictory = () => {
    if (gameStore.isFinished) return

    gameStore.finishGame()
    lastEntryId.value = rankingStore.addEntry(playerName.value, gameStore.moves)
    showVictoryModal.value = true
  }

  const {
    boardCards,
    isCardVisible,
    isCardMatched,
    isCardMismatch,
    matchedPairsCount,
    totalPairs,
    onCardClick: handleCardClick,
  } = useMemoryGame({
    onTurnComplete: () => gameStore.incrementMove(),
    onGameComplete: handleVictory,
  })

  const onCardClick = (...args: Parameters<typeof handleCardClick>) => {
    if (!isAssetsReady.value) return
    handleCardClick(...args)
  }

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
    onCardClick,
    isAssetsReady,
    playerName,
    moves,
    showVictoryModal,
    lastEntryId,
    handleGoHome,
    handleVictoryGoHome,
  }
}
