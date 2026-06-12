<script setup lang="ts">
type Props = {
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  type: 'button',
})
</script>

<template>
  <button
    :type="type"
    class="rounded bg-zinc-100 px-4 py-2 font-medium text-zinc-900 transition hover:bg-white"
  >
    <slot />
  </button>
</template>
