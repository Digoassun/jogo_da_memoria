import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMemoryGame } from '@/composables/useMemoryGame'
import { useGameStore } from '@/stores/gameStore'
import { useRankingStore } from '@/stores/rankingStore'
import { useUserStore } from '@/stores/userStore'

export const useGame = () => {
  const router = useRouter()
  const gameStore = useGameStore()
  const rankingStore = useRankingStore()
  const userStore = useUserStore()
  const { moves } = storeToRefs(gameStore)
  const { playerName } = storeToRefs(userStore)

  const showVictoryModal = ref(false)
  const lastEntryId = ref<string | null>(null)

  const handleVictory = () => {
    if (gameStore.isFinished) return

    gameStore.finishGame()
    lastEntryId.value = rankingStore.addEntry(playerName.value, gameStore.moves)
    showVictoryModal.value = true
  }

  const { boardCards, isCardVisible, onCardClick } = useMemoryGame({
    onTurnComplete: () => gameStore.incrementMove(),
    onGameComplete: handleVictory,
  })

  onMounted(() => {
    gameStore.resetGame()
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
    onCardClick,
    playerName,
    moves,
    showVictoryModal,
    lastEntryId,
    handleGoHome,
    handleVictoryGoHome,
  }
}
