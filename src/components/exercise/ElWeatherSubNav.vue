<script setup>
import { useRoute } from 'vue-router'
import UnitToggler from './UnitToggler.vue'

defineProps({
  basePath: {
    type: String,
    required: true,
  },
})

const route = useRoute()

const aboutPath = (basePath) => `${basePath === '/' ? '' : basePath}/about`
</script>

<template>
  <div class="el-sub-nav">
    <el-menu :default-active="route.path" mode="horizontal" router :ellipsis="false">
      <el-menu-item :index="basePath">날씨 대시보드</el-menu-item>
      <el-menu-item :index="aboutPath(basePath)">서비스 소개</el-menu-item>
      <div class="spacer" />
      <div class="toggler">
        <UnitToggler />
      </div>
    </el-menu>
  </div>
</template>

<style scoped>
.el-sub-nav {
  margin-bottom: 16px;
}

.spacer {
  flex-grow: 1;
}

.toggler {
  display: flex;
  align-items: center;
}
</style>
