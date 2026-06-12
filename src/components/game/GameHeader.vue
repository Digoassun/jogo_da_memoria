<script setup lang="ts">
import DefaultButton from '@/components/ui/DefaultButton.vue'

type Props = {
  playerName: string
  moves: number
  matchedPairs: number
  totalPairs: number
}

type Emits = {
  'go-home': []
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <header class="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <div class="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
      <p class="min-w-0 truncate text-sm text-zinc-300">
        Jogador:
        <span :title='playerName' class="font-semibold text-zinc-100">{{ playerName }}</span>
      </p>

      <p class="shrink-0 text-sm text-zinc-300">
        Tentativas:
        <span class="font-semibold text-zinc-100">{{ moves }}</span>
      </p>

      <p class="shrink-0 text-sm text-zinc-300">
        Pares:
        <span class="font-semibold text-zinc-100">{{ matchedPairs }}/{{ totalPairs }}</span>
      </p>
    </div>

    <DefaultButton type="button" class="w-full shrink-0 sm:w-auto" @click="emit('go-home')">
      Voltar ao início
    </DefaultButton>
  </header>
</template>
