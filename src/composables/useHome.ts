import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { validatePlayerName } from '@/utils/validatePlayerName'

export const useHome = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const inputPlayerName = ref('')
  const nameError = ref<string | null>(null)

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

  return { inputPlayerName, nameError, handleSubmit }
}
