<script setup lang="ts">
import UserNameForm from '@/components/home/UserNameForm.vue'
import { useHome } from '@/composables/useHome'

const { inputPlayerName, nameError, handleSubmit } = useHome()
</script>

<template>
  <main class="flex min-h-screen items-center justify-center p-4">
    <section class="flex flex-col items-center justify-center gap-4 w-64">
      <h1 class="text-2xl font-bold">Jogo da Memória</h1>
      <UserNameForm v-model="inputPlayerName" :error="nameError" @submit="handleSubmit" />
    </section>
  </main>
</template>
