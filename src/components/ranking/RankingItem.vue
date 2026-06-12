<script setup lang="ts">
import type { RankingEntry } from '@/types/ranking'

type Props = {
  position: number
  entry: RankingEntry
  highlighted?: boolean
}

defineProps<Props>()
</script>

<template>
  <li
    class="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm"
    :class="
      highlighted
        ? 'border-emerald-500 bg-emerald-950/40'
        : 'border-zinc-700 bg-zinc-800/50'
    "
  >
    <span class="w-6 shrink-0 font-semibold text-zinc-400">{{ position }}º</span>
    <span class="min-w-0 flex-1 truncate font-medium text-zinc-100">{{ entry.playerName }}</span>
    <span class="shrink-0 text-zinc-300">{{ entry.moves }} tentativas</span>
  </li>
</template>
