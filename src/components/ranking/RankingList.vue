<script setup lang="ts">
import RankingItem from '@/components/ranking/RankingItem.vue'
import type { RankingEntry } from '@/types/ranking'

type Props = {
  entries: RankingEntry[]
  title?: string
  highlightEntryId?: string | null
  getPosition?: (entry: RankingEntry) => number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ranking',
  highlightEntryId: null,
  getPosition: undefined,
})

const resolvePosition = (entry: RankingEntry, index: number) => {
  return props.getPosition ? props.getPosition(entry) : index + 1
}
</script>

<template>
  <section class="flex w-full flex-col gap-3">
    <h2 v-if="title" class="text-lg font-semibold text-center text-zinc-100">{{ title }}</h2>

    <p v-if="entries.length === 0" class="text-sm text-zinc-400">
      Nenhuma partida concluída ainda.
    </p>

    <ol v-else class="flex max-h-64 flex-col gap-2 overflow-y-auto">
      <RankingItem v-for="(entry, index) in entries" :key="entry.id" :position="resolvePosition(entry, index)"
        :entry="entry" :highlighted="highlightEntryId === entry.id" />
    </ol>
  </section>
</template>
