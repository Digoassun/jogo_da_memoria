<script setup lang="ts">
import { computed } from 'vue'
import { CARD_BACK, getCardFace } from '@/constants/cardAssets'
import type { BoardCard } from '@/types/card'

type Props = {
  card: BoardCard
  isVisible: boolean
  isMatched?: boolean
  isMismatch?: boolean
}

type Emits = {
  click: [card: BoardCard]
}

const { card, isVisible, isMatched = false, isMismatch = false } = defineProps<Props>()
const emit = defineEmits<Emits>()

const faceUrl = computed(() => getCardFace(card.value))

const cardLabel = computed(() => {
  if (isMatched) return `Par encontrado: ${card.value}`
  if (!isVisible) return 'Carta virada para baixo'
  return `Carta ${card.value}`
})

const borderClass = computed(() => {
  if (isMatched) return 'border-green-500 hover:border-green-500'
  if (isMismatch) return 'border-red-500 hover:border-red-500'
  return 'border-zinc-600 hover:border-zinc-400'
})

const handleClick = () => {
  emit('click', card)
}
</script>

<template>
  <button type="button"
    class="aspect-5/7 w-full overflow-hidden rounded-md border bg-zinc-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
    :class="borderClass" :aria-label="cardLabel" @click="handleClick">
    <div class="relative h-full w-full" :class="{ 'opacity-80': isMatched }">
      <img :src="CARD_BACK" alt="" aria-hidden="true"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
        :class="isVisible ? 'opacity-0' : 'opacity-100'" loading="eager" decoding="async" draggable="false" />
      <img :src="faceUrl" :alt="cardLabel"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
        :class="isVisible ? 'opacity-100' : 'opacity-0'" loading="eager" decoding="async" draggable="false" />
    </div>
  </button>
</template>
