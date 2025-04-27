<script setup lang="ts">
interface Error {
  message: string
  statusCode: number
  statusMessage: string
}

defineProps<{ error: Error }>()
</script>

<template>
  <p>There's been an error:</p>
  <p>{{ error.message }}</p>
</template>
