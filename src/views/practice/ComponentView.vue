<script setup>
import PracticeNav from '../../components/PracticeNav.vue'
import ComponentLocal from '../../components/practices/component/ComponentLocal.vue'
import ComponentGlobal from '../../components/practices/component/ComponentGlobal.vue'
import LifecycleDemo from '../../components/practices/component/LifecycleDemo.vue'
import PropsSample from '../../components/practices/component/PropsSample.vue'
import EmitsSample from '../../components/practices/component/EmitsSample.vue'
import PropsEmitsParent from '../../components/practices/component/PropsEmitsParent.vue'
import ProvideRoot from '../../components/practices/component/ProvideRoot.vue'
import SlotDefaultParent from '../../components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from '../../components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from '../../components/practices/component/SlotScopedParent.vue'
</script>

<template>
  <div class="practice-view">
    <PracticeNav />

    <h1>문법 실습: 컴포넌트와 슬롯</h1>
    <hr />

    <ComponentLocal />
    <ComponentGlobal />
    <LifecycleDemo />
    <PropsSample />
    <EmitsSample />
    <PropsEmitsParent />
    <ProvideRoot />
    <SlotDefaultParent />
    <SlotNamedParent />
    <SlotScopedParent />
  </div>
</template>
