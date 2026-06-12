<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultButton from '@/components/ui/DefaultButton.vue'
import RankingItem from '@/components/ranking/RankingItem.vue'
import RankingList from '@/components/ranking/RankingList.vue'
import { useRankingStore } from '@/stores/rankingStore'

type Props = {
  entryId: string
  playerName: string
  moves: number
}

type Emits = {
  'go-home': []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const rankingStore = useRankingStore()
const { sortedRankingEntries } = storeToRefs(rankingStore)

const topEntries = computed(() => {
  return sortedRankingEntries.value.slice(0, 10)
})

const playerPosition = computed(() => rankingStore.getEntryPosition(props.entryId))

const playerEntry = computed(() => {
  return sortedRankingEntries.value.find((entry) => entry.id === props.entryId) ?? null
})

const isPlayerInTop = computed(() => {
  if (!playerPosition.value) return false
  return playerPosition.value <= 10
})

const getGlobalPosition = (entry: { id: string }) => {
  return rankingStore.getEntryPosition(entry.id) ?? 0
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true"
      aria-labelledby="victory-modal-title">
      <div class="flex w-full max-w-md flex-col gap-5 rounded-lg border border-zinc-700 bg-zinc-900 p-6 shadow-xl">
        <header class="flex flex-col gap-1 text-center">
          <h2 id="victory-modal-title" class="text-xl font-bold text-zinc-100">
            Parabéns, {{ playerName }}!
          </h2>
          <p class="text-sm text-zinc-400">Você venceu em {{ moves }} tentativas e ficou em {{ playerPosition }}º
            lugar.</p>
        </header>

        <div class="flex w-full flex-col gap-2">
          <RankingList :entries="topEntries" title="Top 10" :highlight-entry-id="entryId"
            :get-position="getGlobalPosition" />

          <template v-if="playerEntry && playerPosition && !isPlayerInTop">
            <ol class="flex flex-col gap-2">
              <RankingItem :position="playerPosition" :entry="playerEntry" highlighted />
            </ol>
          </template>
        </div>

        <footer class="flex justify-center">
          <DefaultButton type="button" @click="emit('go-home')">
            Ir ao início
          </DefaultButton>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
