<script setup>
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import DirectiveVHtml from './components/practices/directive/DirectiveVHtml.vue'
import DirectiveVHtmlXss from './components/practices/directive/DirectiveVHtmlXss.vue'
import DirectiveVText from './components/practices/directive/DirectiveVText.vue'
import DirectiveVBind from './components/practices/directive/DirectiveVBind.vue'
import DirectiveClassBind from './components/practices/directive/DirectiveClassBind.vue'
import DirectiveStyleBind from './components/practices/directive/DirectiveStyleBind.vue'
</script>

<template>
  <div style="padding: 20px">
    <SampleOne />
    <SampleTwo />
    <DirectiveVHtml />
    <DirectiveVHtmlXss />
    <DirectiveVText />
    <DirectiveVBind />
    <DirectiveClassBind />
    <DirectiveStyleBind />
  </div>
</template>
