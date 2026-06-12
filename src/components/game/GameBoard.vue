<script setup lang="ts">
import MemoryCard from '@/components/game/MemoryCard.vue'
import type { BoardCard } from '@/types/card'

type Props = {
  cards: BoardCard[]
  isCardVisible: (card: BoardCard) => boolean
}

type Emits = {
  'card-click': [card: BoardCard]
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="grid grid-cols-5 gap-3">
    <MemoryCard v-for="card in cards" :key="card.id" :card="card" :is-visible="isCardVisible(card)"
      @click="emit('card-click', $event)" />
  </div>
</template>
