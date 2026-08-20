<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
  hotOnly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update-query', 'toggle-hot'])

// v-model 대신 분해한 형태를 쓰면 한글 조합 중에도 입력이 끊기지 않는다
const onInput = (e) => {
  emit('update-query', e.target.value)
}
</script>

<template>
  <div class="search-bar">
    <label for="component-search">도시 검색 </label>
    <input
      id="component-search"
      type="text"
      :value="query"
      @input="onInput"
      placeholder="도시 이름을 한글로 입력하세요"
    />

    <label class="hot-only">
      <input type="checkbox" :checked="hotOnly" @change="emit('toggle-hot')" />
      25도 이상만 보기
    </label>
  </div>
</template>

<style scoped>
.search-bar input[type='text'] {
  padding: 6px 10px;
  width: 240px;
}

.hot-only {
  margin-left: 12px;
}
</style>
