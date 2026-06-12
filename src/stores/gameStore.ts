import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const moves = ref(0)
  const isFinished = ref(false)

  const incrementMove = () => {
    moves.value++
  }

  const finishGame = () => {
    isFinished.value = true
  }

  const resetGame = () => {
    moves.value = 0
    isFinished.value = false
  }

  return { moves, isFinished, incrementMove, finishGame, resetGame }
})
