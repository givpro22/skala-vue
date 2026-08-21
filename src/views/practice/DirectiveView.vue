<script setup>
import PracticeNav from '../../components/PracticeNav.vue'
import DirectiveVHtml from '../../components/practices/directive/DirectiveVHtml.vue'
import DirectiveVHtmlXss from '../../components/practices/directive/DirectiveVHtmlXss.vue'
import DirectiveVText from '../../components/practices/directive/DirectiveVText.vue'
import DirectiveVBind from '../../components/practices/directive/DirectiveVBind.vue'
import DirectiveClassBind from '../../components/practices/directive/DirectiveClassBind.vue'
import DirectiveStyleBind from '../../components/practices/directive/DirectiveStyleBind.vue'
import DirectiveBindShorthand from '../../components/practices/directive/DirectiveBindShorthand.vue'
import DirectiveVIf from '../../components/practices/directive/DirectiveVIf.vue'
import DirectiveVShow from '../../components/practices/directive/DirectiveVShow.vue'
import DirectiveVFor from '../../components/practices/directive/DirectiveVFor.vue'
import DirectiveVPre from '../../components/practices/directive/DirectiveVPre.vue'
import DirectiveVCloak from '../../components/practices/directive/DirectiveVCloak.vue'
import DirectiveVOnce from '../../components/practices/directive/DirectiveVOnce.vue'
import DirectiveVMemo from '../../components/practices/directive/DirectiveVMemo.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: 디렉티브</h1>
    <hr />

    <DirectiveVHtml />
    <DirectiveVHtmlXss />
    <DirectiveVText />
    <DirectiveVBind />
    <DirectiveClassBind />
    <DirectiveStyleBind />
    <DirectiveBindShorthand />
    <DirectiveVIf />
    <DirectiveVShow />
    <DirectiveVFor />
    <DirectiveVPre />
    <DirectiveVCloak />
    <DirectiveVOnce />
    <DirectiveVMemo />
  </div>
</template>
