<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  lead: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="page-hero">
    <p class="hero-eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p v-if="lead" class="hero-lead">{{ lead }}</p>
  </header>
</template>

<style scoped>
.page-hero {
  text-align: center;
}

.hero-eyebrow {
  margin: 0 0 6px;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.page-hero h1 {
  margin: 0 0 10px;
  font-size: clamp(26px, 4vw, 34px);
  line-height: 1.3;
}

.hero-lead {
  max-width: 480px;
  margin: 0 auto;
  color: var(--color-text-soft);
  line-height: 1.7;
}
</style>
