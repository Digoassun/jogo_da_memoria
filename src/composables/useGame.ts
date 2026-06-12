import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMemoryGame } from '@/composables/useMemoryGame'
import { useToast } from '@/composables/useToast'
import { useGameStore } from '@/stores/gameStore'
import { useUserStore } from '@/stores/userStore'

export const useGame = () => {
  const router = useRouter()
  const gameStore = useGameStore()
  const userStore = useUserStore()
  const { show: showToast } = useToast()
  const { moves } = storeToRefs(gameStore)
  const { playerName } = storeToRefs(userStore)

  const handleVictory = () => {
    if (gameStore.isFinished) return

    gameStore.finishGame()
    showToast(
      `Parabéns, ${playerName.value}! Você venceu em ${gameStore.moves} tentativas!`,
      'success',
    )

    setTimeout(() => {
      userStore.clearPlayer()
      router.push('/')
    }, 2500)
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

  return {
    boardCards,
    isCardVisible,
    onCardClick,
    playerName,
    moves,
    handleGoHome,
  }
}
