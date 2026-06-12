<script setup lang="ts">
import HomeAbout from '@/components/home/HomeAbout.vue'
import UserNameForm from '@/components/home/UserNameForm.vue'
import RankingList from '@/components/ranking/RankingList.vue'
import { useHome } from '@/composables/useHome'

const { inputPlayerName, nameError, handleSubmit, homeRankingEntries } = useHome()
</script>

<template>
  <main class="flex min-h-screen items-center justify-center p-4">
    <section class="flex w-full max-w-sm flex-col items-center lg:max-w-4xl">
      <img src="/logo.png" alt="Jogo da Memória" class="h-40 w-40" />

      <div class="flex w-full flex-col gap-8 lg:flex-row items-center lg:gap-0 mb-8">
        <div class="flex w-full flex-1 flex-col items-center lg:px-8">
          <UserNameForm v-model="inputPlayerName" :error="nameError" @submit="handleSubmit" />
        </div>

        <div class="hidden w-px shrink-0 self-stretch bg-zinc-700/80 lg:block" aria-hidden="true" />

        <div class="flex w-full flex-1 flex-col lg:px-8">
          <RankingList title="Top 5" :entries="homeRankingEntries" />
        </div>
      </div>

      <HomeAbout />
    </section>
  </main>
</template>
