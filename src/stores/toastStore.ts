import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ToastType } from '@/types/toast'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')
  const type = ref<ToastType>('success')
  const isVisible = ref(false)

  const hide = () => {
    isVisible.value = false
  }

  const show = (text: string, toastType: ToastType) => {
    message.value = text
    type.value = toastType
    isVisible.value = true

    setTimeout(() => {
      hide()
    }, 3000)
  }

  return { message, type, isVisible, show, hide }
})
