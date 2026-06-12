<script setup lang="ts">
import { computed } from 'vue'
import { CARD_BACK, getCardFace } from '@/constants/cardAssets'
import type { BoardCard } from '@/types/card'

type Props = {
  card: BoardCard
  isVisible: boolean
}

type Emits = {
  click: [card: BoardCard]
}

const { card, isVisible } = defineProps<Props>()
const emit = defineEmits<Emits>()

const cardImage = computed(() => {
  if (!isVisible) return CARD_BACK
  return getCardFace(card.value)
})

const cardLabel = computed(() => {
  if (!isVisible) return 'Carta virada para baixo'
  return `Carta ${card.value}`
})

const handleClick = () => {
  emit('click', card)
}
</script>

<template>
  <button type="button"
    class="aspect-5/7 w-full overflow-hidden rounded-md border border-zinc-600 bg-zinc-900 transition hover:border-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
    :aria-label="cardLabel" @click="handleClick">
    <img :src="cardImage" :alt="cardLabel" class="h-full w-full object-cover" draggable="false" />
  </button>
</template>
