<script setup>
import { ref } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

const message = ref('Parent 초기 메시지')

const handleUpdateRequest = (newValue) => {
  message.value = newValue
}
</script>

<template>
  <div class="practice-section">
    <h2>Props &amp; Emits</h2>

    <p>데이터는 아래로 내려가고 이벤트는 위로 올라온다. 자식은 받은 props를 고칠 수 없어서 부모에게 요청만 보낸다.</p>

    <h3>상위 컴포넌트 (Parent)</h3>
    <p>
      현재 로컬 데이터(State): <strong>{{ message }}</strong>
    </p>

    <PropsEmitsChild :parent-data="message" @update-request="handleUpdateRequest" />
  </div>
</template>
