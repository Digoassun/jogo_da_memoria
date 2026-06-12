<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { CARDS } from '../data/cards'
import { reactive, watch } from 'vue'

type Card = {
    value: string
    id: number
}

const boardCards = computed(() => {
    return [...CARDS, ...CARDS]
        .map((card, id) => ({ ...card, id }))
        .sort(function () {
            return Math.floor(Math.random() * 10)
        })
})

const isFacingUp = reactive<number[]>([])
const matchedIds = reactive<number[]>([])

const isMatch = (arr: Card[]) => {
    const first = arr[0]
    const second = arr[1]
    if (!first || !second) return false
    return first.value === second.value
}

const isCardVisible = (card: Card) => {
    return matchedIds.includes(card.id) || isFacingUp.includes(card.id)
}

const onCardClick = (card: Card) => {
    if (matchedIds.includes(card.id)) return
    if (isFacingUp.includes(card.id)) return
    if (isFacingUp.length >= 2) return

    isFacingUp.push(card.id)
}

watch(isFacingUp, (facingUpIds) => {
    if (facingUpIds.length !== 2) return

    const selectedCards = facingUpIds
        .map((id) => boardCards.value.find((card) => card.id === id))
        .filter((card): card is Card => card !== undefined)

    if (selectedCards.length !== 2) return

    if (isMatch(selectedCards)) {
        matchedIds.push(...facingUpIds)
        isFacingUp.length = 0
        return
    }

    setTimeout(() => {
        isFacingUp.length = 0
    }, 1500)
})
</script>
<template>
    <div class="board">
        <div v-for="card in boardCards" :key="card.id" class="card" @click="onCardClick(card)">
            {{ isCardVisible(card) ? card.value : '???' }}
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
