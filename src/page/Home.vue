<script setup lang="ts">
import { ref } from 'vue';
const userName = ref<string>('')
import { useRouter } from 'vue-router'

const router = useRouter()

const goGame = () =>{
 router.push('/game')
}
</script>

<template>
    <form @submit="goGame()">
        <input v-model="userName" name="userName" placeholder="Nome do Usuário">
        <button type="submit">Seguir para Jogo</button>
    </form>
</template>