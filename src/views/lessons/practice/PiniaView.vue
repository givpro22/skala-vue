<script setup>
import PracticeNav from '../../../components/PracticeNav.vue'
import StoreCounter from '../../../components/practices/library/StoreCounter.vue'
import PiniaOptionStore from '../../../components/practices/pinia/PiniaOptionStore.vue'
import PiniaSetupStore from '../../../components/practices/pinia/PiniaSetupStore.vue'
import PiniaStoreToRefs from '../../../components/practices/pinia/PiniaStoreToRefs.vue'
import PiniaShare from '../../../components/practices/pinia/PiniaShare.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: Pinia 상태 관리</h1>
    <hr />

    <StoreCounter />
    <PiniaOptionStore />
    <PiniaSetupStore />
    <PiniaStoreToRefs />
    <PiniaShare />
  </div>
</template>
