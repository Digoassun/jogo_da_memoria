<script setup lang="ts">
import UserNameForm from '@/components/home/UserNameForm.vue'
import RankingList from '@/components/ranking/RankingList.vue'
import { useHome } from '@/composables/useHome'

const { inputPlayerName, nameError, handleSubmit, homeRankingEntries } = useHome()
</script>

<template>
  <main class="flex min-h-screen items-center justify-center p-4">
    <section class="flex w-full max-w-sm flex-col items-center gap-8">
      <div class="flex w-full flex-col items-center">
        <img src="/logo.png" alt="Jogo da Memória" class="h-40 w-40" />
        <UserNameForm v-model="inputPlayerName" :error="nameError" @submit="handleSubmit" />
      </div>

      <RankingList title="Top 5" :entries="homeRankingEntries" />
    </section>
  </main>
</template>
