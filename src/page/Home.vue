<script setup lang="ts">
import UserNameForm from '@/components/home/UserNameForm.vue'
import { useHome } from '@/composables/useHome'

const { inputPlayerName, nameError, handleSubmit } = useHome()
</script>

<template>
  <main class="flex min-h-screen items-center justify-center p-4">
    <section class="flex flex-col items-center justify-center w-64">
      <img src="/logo.png" alt="Jogo da Memória" class="w-40 h-40" />
      <UserNameForm v-model="inputPlayerName" :error="nameError" @submit="handleSubmit" />
    </section>
  </main>
</template>
