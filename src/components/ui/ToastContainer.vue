<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Toast from '@/components/ui/Toast.vue'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()
const { message, type, isVisible } = storeToRefs(toastStore)
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-full opacity-0">
      <div v-if="isVisible" class="fixed top-4 left-1/2 z-50 -translate-x-1/2">
        <Toast :message="message" :type="type" />
      </div>
    </Transition>
  </Teleport>
</template>
