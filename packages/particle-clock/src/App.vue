<script setup>
import { onMounted, ref } from 'vue';
import Particle from './components/particle';
const canvas = ref();
const _canvas = canvas.value;
onMounted(() => {
  canvas.value.width = window.innerWidth * window.devicePixelRatio;
  canvas.value.height = window.innerHeight * window.devicePixelRatio;
  const ctx = canvas.value.getContext('2d');
  console.log('ctx', ctx);

  const particles = [];
  for (let i = 0; i <= 100; i++) {
    particles.push(new Particle(canvas.value));
  }
  draw(ctx, particles, canvas.value);
});
const text = null;
const draw = (ctx, particles, canvas) => {
  // clear();
  update(text, ctx, canvas);
  particles.forEach((p) => p.draw(ctx));
  window.requestAnimationFrame(draw);
};

const getText = () => {
  return new Date().toTimeString().substring(0, 8);
};

const clear = (ctx) => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

const update = (text, ctx, canvas) => {
  const newText = getText();
  if (newText === text) {
    return;
  }
  clear(ctx);
  text = newText;
  const { width, height } = canvas;
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'middle';
  ctx.font = `${140 * devicePixelRatio}px 'DS-Digital,sans-serif'`;
  ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);
};
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  border: 1px solid;
}
</style>
