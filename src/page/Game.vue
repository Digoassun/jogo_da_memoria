<script setup lang="ts">
import GameBoard from '@/components/game/GameBoard.vue'
import GameHeader from '@/components/game/GameHeader.vue'
import VictoryModal from '@/components/game/VictoryModal.vue'
import { useGame } from '@/composables/useGame'

const {
  boardCards,
  isCardVisible,
  isCardMatched,
  isCardMismatch,
  matchedPairsCount,
  totalPairs,
  onCardClick,
  isAssetsReady,
  playerName,
  moves,
  showVictoryModal,
  lastEntryId,
  handleGoHome,
  handleVictoryGoHome,
} = useGame()
</script>

<template>
  <main class="flex min-h-screen w-full flex-col items-center justify-center px-4 py-6">
    <div class="flex w-full max-w-2xl flex-col items-center gap-6">
      <GameHeader
        :player-name="playerName"
        :moves="moves"
        :matched-pairs="matchedPairsCount"
        :total-pairs="totalPairs"
        @go-home="handleGoHome"
      />
      <GameBoard
        class="w-full"
        :cards="boardCards"
        :is-card-visible="isCardVisible"
        :is-card-matched="isCardMatched"
        :is-card-mismatch="isCardMismatch"
        :is-ready="isAssetsReady"
        @card-click="onCardClick"
      />
    </div>

    <VictoryModal
      v-if="showVictoryModal && lastEntryId"
      :entry-id="lastEntryId"
      :player-name="playerName"
      :moves="moves"
      @go-home="handleVictoryGoHome"
    />
  </main>
</template>
