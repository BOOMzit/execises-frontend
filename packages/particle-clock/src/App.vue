<script setup>
import { h, onMounted, ref } from 'vue';
import Particle from './components/particle';
const canvas = ref();
onMounted(() => {
  canvas.value.width = window.innerWidth * window.devicePixelRatio;
  canvas.value.height = window.innerHeight * window.devicePixelRatio;
  const ctx = canvas.value.getContext('2d', { willReadFrequently: true });
  const particles = [];

  let text = null;
  const draw = () => {
    clear();
    update();
    particles.forEach((p) => p.draw(ctx));
    window.requestAnimationFrame(draw);
  };

  const getText = () => {
    return new Date().toTimeString().substring(0, 8);
  };

  const clear = () => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  };

  const update = () => {
    const newText = getText();
    if (newText === text) {
      return;
    }
    clear();
    text = newText;
    const { width, height } = canvas.value;
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';
    ctx.font = `${140 * devicePixelRatio}px 'DS-Digital,sans-serif'`;
    ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);
    const points = getPoints();
    clear();
    points.forEach((p, i) => {
      let particle = particles[i];
      if (!particle) {
        particle = new Particle(canvas.value);
        particles.push(particle);
      }
      const [x, y] = p;
      particle.moveTo(x, y);
    });
    if (points.length < particles.length) {
      particles.splice(points.length);
    }
  };

  const getPoints = () => {
    const points = [];
    const { width, height, data } = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
    const gap = 5;
    for (let i = 0; i < width; i += gap) {
      for (let j = 0; j < height; j += gap) {
        const index = (i + j * width) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        if (r === 0 && g === 0 && b === 0 && a === 255) {
          points.push([i, j]);
        }
      }
    }
    return points;
  };

  draw(ctx, particles, canvas.value);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped></style>
