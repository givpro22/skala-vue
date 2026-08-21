<script setup>
import PracticeNav from '../../components/PracticeNav.vue'
import EventHandler from '../../components/practices/event/EventHandler.vue'
import EventObject from '../../components/practices/event/EventObject.vue'
import EventModifier from '../../components/practices/event/EventModifier.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: 이벤트 핸들링</h1>
    <hr />

    <EventHandler />
    <EventObject />
    <EventModifier />
  </div>
</template>
