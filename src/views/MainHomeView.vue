<script setup>
import SphereHero from '../components/home/SphereHero.vue'

const shortcuts = [
  { path: '/lessons', label: '실습 아카이브', desc: '1일차부터 4일차까지의 문법 실습과 과제' },
  { path: '/lessons/final', label: '최종본 대시보드', desc: '배운 것을 모두 반영한 누적본' },
  { path: '/troubleshooting', label: '트러블슈팅', desc: '막혔던 자리와 푼 방법' },
]
</script>

<template>
  <section class="main-home">
    <header class="hero-copy">
      <p class="hero-eyebrow">SKALA Vue.js</p>
      <h1>도시 스무 곳의 지금 날씨</h1>
      <p class="hero-lead">
        카드 한 장이 도시 하나다. 사진 위 숫자가 방금 받아 온 기온이고, 카드를 누르면 그 도시의 상세
        화면으로 간다.
      </p>
    </header>

    <SphereHero />

    <nav class="hero-links">
      <router-link v-for="item in shortcuts" :key="item.path" :to="item.path" class="hero-link">
        <strong>{{ item.label }}</strong>
        <span>{{ item.desc }}</span>
      </router-link>
    </nav>
  </section>
</template>

<style scoped>
.main-home {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-copy {
  text-align: center;
}

.hero-eyebrow {
  margin: 0 0 6px;
  color: #42b883;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.hero-copy h1 {
  margin: 0 0 10px;
  font-size: 34px;
  line-height: 1.3;
}

.hero-lead {
  max-width: 480px;
  margin: 0 auto;
  color: #666;
  line-height: 1.7;
}

.hero-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.hero-link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid #e2e6ec;
  border-radius: 12px;
  color: #333;
}

.hero-link:hover {
  border-color: #42b883;
}

.hero-link span {
  color: #777;
  font-size: 13px;
}
</style>
