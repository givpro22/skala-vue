<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h3 v-if="title" class="card-title">{{ title }}</h3>

    <slot>
      <p class="empty-slot">주입된 콘텐츠가 없습니다.</p>
    </slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 16px;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.card-title {
  margin: 0 0 10px;
  font-size: 15px;
  color: var(--color-text-soft);
}

.empty-slot {
  color: var(--color-text-muted);
}
</style>
