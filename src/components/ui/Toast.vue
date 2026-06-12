<script setup lang="ts">
import type { ToastType } from '@/types/toast'

type Props = {
  message: string
  type: ToastType
}

defineProps<Props>()
</script>

<template>
  <div role="alert" class="rounded-lg px-6 py-3 text-sm font-medium shadow-lg"
    :class="type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'">
    {{ message }}
  </div>
</template>
