<script setup>
import PracticeNav from '../../components/PracticeNav.vue'
import FormBinding from '../../components/practices/form/FormBinding.vue'
import FormElements from '../../components/practices/form/FormElements.vue'
import FormModifiers from '../../components/practices/form/FormModifiers.vue'
import StyleSample from '../../components/practices/style/StyleSample.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: 폼 바인딩과 스타일</h1>
    <hr />

    <FormBinding />
    <FormElements />
    <FormModifiers />
    <StyleSample />
  </div>
</template>
