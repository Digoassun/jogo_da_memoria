<script setup lang="ts">
import GameBoard from '@/components/game/GameBoard.vue'
import GameHeader from '@/components/game/GameHeader.vue'
import { useGame } from '@/composables/useGame'

const { boardCards, isCardVisible, onCardClick, playerName, moves, handleGoHome } = useGame()
</script>

<template>
  <main class="flex min-h-screen w-full flex-col items-center justify-center px-4 py-6">
    <div class="flex w-full max-w-2xl flex-col items-center gap-6">
      <GameHeader :player-name="playerName" :moves="moves" @go-home="handleGoHome" />
      <GameBoard
        class="w-full"
        :cards="boardCards"
        :is-card-visible="isCardVisible"
        @card-click="onCardClick"
      />
    </div>
  </main>
</template>
