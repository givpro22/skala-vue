<script setup>
import WeatherMockup from './components/exercise/WeatherMockup.vue'
import WeatherComposition from './components/exercise/WeatherComposition.vue'
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import DirectiveVHtml from './components/practices/directive/DirectiveVHtml.vue'
import DirectiveVHtmlXss from './components/practices/directive/DirectiveVHtmlXss.vue'
import DirectiveVText from './components/practices/directive/DirectiveVText.vue'
import DirectiveVBind from './components/practices/directive/DirectiveVBind.vue'
import DirectiveClassBind from './components/practices/directive/DirectiveClassBind.vue'
import DirectiveStyleBind from './components/practices/directive/DirectiveStyleBind.vue'
import DirectiveBindShorthand from './components/practices/directive/DirectiveBindShorthand.vue'
import DirectiveVIf from './components/practices/directive/DirectiveVIf.vue'
import DirectiveVShow from './components/practices/directive/DirectiveVShow.vue'
import DirectiveVFor from './components/practices/directive/DirectiveVFor.vue'
import DirectiveVPre from './components/practices/directive/DirectiveVPre.vue'
import DirectiveVCloak from './components/practices/directive/DirectiveVCloak.vue'
import DirectiveVOnce from './components/practices/directive/DirectiveVOnce.vue'
import DirectiveVMemo from './components/practices/directive/DirectiveVMemo.vue'
import EventHandler from './components/practices/event/EventHandler.vue'
import EventObject from './components/practices/event/EventObject.vue'
import EventModifier from './components/practices/event/EventModifier.vue'
import FormBinding from './components/practices/form/FormBinding.vue'
import FormElements from './components/practices/form/FormElements.vue'
import FormModifiers from './components/practices/form/FormModifiers.vue'
import StyleSample from './components/practices/style/StyleSample.vue'
import ReactiveRef from './components/practices/composition/ReactiveRef.vue'
import ReactiveObject from './components/practices/composition/ReactiveObject.vue'
import ComputedSample from './components/practices/composition/ComputedSample.vue'
import WatchSample from './components/practices/composition/WatchSample.vue'
import WatchMulti from './components/practices/composition/WatchMulti.vue'
import WatchDeep from './components/practices/composition/WatchDeep.vue'
import WatchReactive from './components/practices/composition/WatchReactive.vue'
import WatchEffectSample from './components/practices/composition/WatchEffectSample.vue'
import ComponentLocal from './components/practices/component/ComponentLocal.vue'
import ComponentGlobal from './components/practices/component/ComponentGlobal.vue'
import LifecycleDemo from './components/practices/component/LifecycleDemo.vue'
import PropsSample from './components/practices/component/PropsSample.vue'
import EmitsSample from './components/practices/component/EmitsSample.vue'
import PropsEmitsParent from './components/practices/component/PropsEmitsParent.vue'
import ProvideRoot from './components/practices/component/ProvideRoot.vue'
import SlotDefaultParent from './components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from './components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from './components/practices/component/SlotScopedParent.vue'
</script>

<template>
  <div style="padding: 20px">
    <h1>⛅ 과제 1: 날씨 (Mockup)</h1>
    <hr />
    <WeatherMockup />

    <h1>⛅ 과제 2: 날씨 (컴포지션)</h1>
    <hr />
    <WeatherComposition />

    <h1>문법 실습</h1>
    <hr />

    <SampleOne />
    <SampleTwo />
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
    <EventHandler />
    <EventObject />
    <EventModifier />
    <FormBinding />
    <FormElements />
    <FormModifiers />
    <StyleSample />
    <ReactiveRef />
    <ReactiveObject />
    <ComputedSample />
    <WatchSample />
    <WatchMulti />
    <WatchDeep />
    <WatchReactive />
    <WatchEffectSample />
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
