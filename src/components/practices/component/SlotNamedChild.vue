<template>
  <div class="base-card">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.base-card {
  margin-top: 10px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

header {
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

main {
  padding-top: 8px;
}
</style>
