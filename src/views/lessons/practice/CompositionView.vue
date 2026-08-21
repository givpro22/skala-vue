<script setup>
import PracticeNav from '../../../components/PracticeNav.vue'
import ReactiveRef from '../../../components/practices/composition/ReactiveRef.vue'
import ReactiveObject from '../../../components/practices/composition/ReactiveObject.vue'
import ComputedSample from '../../../components/practices/composition/ComputedSample.vue'
import WatchSample from '../../../components/practices/composition/WatchSample.vue'
import WatchMulti from '../../../components/practices/composition/WatchMulti.vue'
import WatchDeep from '../../../components/practices/composition/WatchDeep.vue'
import WatchReactive from '../../../components/practices/composition/WatchReactive.vue'
import WatchEffectSample from '../../../components/practices/composition/WatchEffectSample.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: Composition API</h1>
    <hr />

    <ReactiveRef />
    <ReactiveObject />
    <ComputedSample />
    <WatchSample />
    <WatchMulti />
    <WatchDeep />
    <WatchReactive />
    <WatchEffectSample />
  </div>
</template>
