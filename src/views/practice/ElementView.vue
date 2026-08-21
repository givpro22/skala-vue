<script setup>
import PracticeNav from '../../components/PracticeNav.vue'
import ElementForm from '../../components/practices/library/ElementForm.vue'
import ElementCommerce from '../../components/practices/library/ElementCommerce.vue'
import ElementFeedback from '../../components/practices/library/ElementFeedback.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: Element Plus</h1>
    <hr />

    <ElementForm />
    <ElementCommerce />
    <ElementFeedback />
  </div>
</template>
