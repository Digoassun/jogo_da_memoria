<script setup lang="ts">
import GameBoard from '@/components/game/GameBoard.vue'
import { useGame } from '@/composables/useGame'

const { boardCards, isCardVisible, onCardClick } = useGame()
</script>

<template>
  <main class="flex min-h-screen items-center justify-center p-4">
    <GameBoard
      :cards="boardCards"
      :is-card-visible="isCardVisible"
      @card-click="onCardClick"
    />
  </main>
</template>
