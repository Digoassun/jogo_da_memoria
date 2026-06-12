<script setup lang="ts">
import { useRouter } from 'vue-router'
import DefaultButton from '@/components/ui/DefaultButton.vue'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
    <p class="text-6xl font-bold text-zinc-100">404</p>
    <h1 class="text-xl font-semibold text-zinc-100">Página não encontrada</h1>
    <p class="max-w-sm text-sm text-zinc-400">
      O endereço que você acessou não existe ou foi movido.
    </p>
    <DefaultButton type="button" @click="handleGoHome">
      Voltar ao início
    </DefaultButton>
  </main>
</template>
