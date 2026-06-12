<script setup lang="ts">
type Props = {
  modelValue: string
  name?: string
  placeholder?: string
  invalid?: boolean
}

type Emits = {
  'update:modelValue': [value: string]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input :value="modelValue" :name="name" :placeholder="placeholder" :aria-invalid="invalid"
    class="w-full rounded border bg-zinc-800 px-3 py-2 text-zinc-100 placeholder:text-zinc-500"
    :class="invalid ? 'border-red-500' : 'border-zinc-600'" @input="handleInput" />
</template>
