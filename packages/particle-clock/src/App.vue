<script setup>
import { onMounted, ref } from 'vue'
const canvas = ref()
const ctx = canvas.value.getContext('2d')
onMounted(() => {
  canvas.value.width = window.innerWidth * window.devicePixelRatio
  canvas.value.height = window.innerHeight * window.devicePixelRatio
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped></style>
