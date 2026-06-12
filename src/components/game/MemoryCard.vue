<script setup lang="ts">
import type { BoardCard } from '@/types/card'

type Props = {
  card: BoardCard
  isVisible: boolean
}

type Emits = {
  click: [card: BoardCard]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click', props.card)
}
</script>

<template>
  <button
    type="button"
    class="rounded border border-zinc-600 p-3 text-center transition hover:border-zinc-400"
    :aria-label="isVisible ? `Carta ${card.value}` : 'Carta virada para baixo'"
    @click="handleClick"
  >
    {{ isVisible ? card.value : '???' }}
  </button>
</template>
