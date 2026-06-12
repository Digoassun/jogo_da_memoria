import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { userRepository } from '@/repositories/userRepository'

export const useUserStore = defineStore('user', () => {
  const playerName = ref<string>('')

  const hasPlayer = computed<boolean>(() => playerName.value.trim().length > 0)

  const setPlayerName = (name: string) => {
    playerName.value = name
    userRepository.save({ name })
  }

  const clearPlayer = () => {
    playerName.value = ''
    userRepository.clear()
  }

  return { playerName, hasPlayer, setPlayerName, clearPlayer }
})
