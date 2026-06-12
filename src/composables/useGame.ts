import { useMemoryGame } from '@/composables/useMemoryGame'

export const useGame = () => {
  const { boardCards, isCardVisible, onCardClick } = useMemoryGame()

  return {
    boardCards,
    isCardVisible,
    onCardClick,
  }
}
