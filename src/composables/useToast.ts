import { useToastStore } from '@/stores/toastStore'
import type { ToastType } from '@/types/toast'

export const useToast = () => {
  const toastStore = useToastStore()

  const show = (message: string, type: ToastType) => {
    toastStore.show(message, type)
  }

  return { show }
}
