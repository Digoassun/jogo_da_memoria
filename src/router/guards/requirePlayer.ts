import { useUserStore } from '@/stores/userStore'
import type { NavigationGuard } from 'vue-router'

export const requirePlayer: NavigationGuard = () => {
  const userStore = useUserStore()

  if (!userStore.hasPlayer) {
    return '/'
  }
}
