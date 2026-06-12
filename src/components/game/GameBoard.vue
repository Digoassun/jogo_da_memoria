<script setup lang="ts">
import MemoryCard from '@/components/game/MemoryCard.vue'
import type { BoardCard } from '@/types/card'

type Props = {
  cards: BoardCard[]
  isCardVisible: (card: BoardCard) => boolean
  isCardMatched: (card: BoardCard) => boolean
  isCardMismatch: (card: BoardCard) => boolean
  isReady?: boolean
}

type Emits = {
  'card-click': [card: BoardCard]
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div
    class="grid grid-cols-5 gap-3 transition-opacity"
    :class="{ 'pointer-events-none opacity-70': isReady === false }"
    :aria-busy="isReady === false"
  >
    <MemoryCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :is-visible="isCardVisible(card)"
      :is-matched="isCardMatched(card)"
      :is-mismatch="isCardMismatch(card)"
      @click="emit('card-click', $event)"
    />
  </div>
</template>
