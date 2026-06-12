<script setup lang="ts">
import DefaultButton from '@/components/ui/DefaultButton.vue'
import DefaultInput from '@/components/ui/DefaultInput.vue'

type Props = {
  modelValue: string
  error?: string | null
}

type Emits = {
  'update:modelValue': [value: string]
  submit: []
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-3" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-1">
      <DefaultInput
        :model-value="modelValue"
        name="userName"
        placeholder="Nome do Usuário"
        :invalid="Boolean(error)"
        @update:model-value="emit('update:modelValue', $event)"
      />
      <p v-if="error" class="text-sm text-red-400" role="alert">{{ error }}</p>
    </div>
    <DefaultButton type="submit">Seguir para Jogo</DefaultButton>
  </form>
</template>
