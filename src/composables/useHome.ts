import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useRankingStore } from '@/stores/rankingStore'
import { useUserStore } from '@/stores/userStore'
import { validatePlayerName } from '@/utils/validatePlayerName'

export const useHome = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const rankingStore = useRankingStore()
  const { sortedRankingEntries } = storeToRefs(rankingStore)
  const inputPlayerName = ref('')
  const nameError = ref<string | null>(null)

  const homeRankingEntries = computed(() => {
    return sortedRankingEntries.value.slice(0, 5)
  })

  onMounted(() => {
    userStore.clearPlayer()
  })

  watch(inputPlayerName, () => {
    nameError.value = null
  })

  const handleSubmit = () => {
    const error = validatePlayerName(inputPlayerName.value)

    if (error) {
      nameError.value = error
      return
    }

    userStore.setPlayerName(inputPlayerName.value.trim())
    router.push('/game')
  }

  return { inputPlayerName, nameError, handleSubmit, homeRankingEntries }
}
