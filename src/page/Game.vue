<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { CARDS } from '../data/cards'
import { reactive, ref, watch } from 'vue'

type Card = {
    value: string
}
const boardCards = computed(() => {
    return [...CARDS, ...CARDS].sort(function () {
        return Math.floor(Math.random() * 10);
    });
})

const isFacingUp = reactive<Card[]>([])
const isFacingDown = ref<boolean>(true)
const isMatched = ref<boolean>(false)


const isMatch = (arr: Card[]) => {
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
    //         return true
    //     }
    // }
    return false
}
const onCardClick = (card: Card) => {
    isFacingUp.push(card)
}

</script>
<template>
    <div class="board">
        <div v-for="(card) in boardCards" @click="onCardClick(card)" class="card" key={{card.id}}>
            {{ isFacingDown ? '???' : card.value }}
        </div>
    </div>
</template>
<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.card {
    border: 1px solid black;
    padding: 12px;
}
</style>