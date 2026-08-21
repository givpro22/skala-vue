<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <el-card class="practice-card">
    <template #header>실습 2. 커머스 상품 수량 및 평점 시스템</template>

    <div class="form-row">
      <span class="label">구매 수량 선택:</span>
      <el-input-number v-model="productQuantity" :min="1" :max="10" />
      <span class="hint">(최대 10개 구매 가능)</span>
    </div>

    <div class="form-row">
      <span class="label">상품 만족도 별점:</span>
      <el-rate v-model="productRate" />
      <span>{{ productRate }} 점</span>
    </div>

    <el-alert
      :title="`실시간 장부 요약: 선택 수량 ${productQuantity}개 / 내가 준 점수 ${productRate}점`"
      type="info"
      :closable="false"
    />
  </el-card>
</template>

<style scoped>
.practice-card {
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.form-row .label {
  white-space: nowrap;
}

.hint {
  color: #909399;
  font-size: 13px;
}
</style>
