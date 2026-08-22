<script setup>
import { storeToRefs } from 'pinia'
import PageHero from '../components/home/PageHero.vue'
import SphereHero from '../components/home/SphereHero.vue'
import { useFinalWeatherStore } from '../stores/finalWeatherStore.js'
import { useConfigStore } from '../stores/configStore.js'
import { heroCities } from '../data/heroCities.js'

// 스피어가 채우는 스토어를 그대로 읽는다. 아래 요약 줄의 숫자와 최종본 목록의 숫자가 같은 출처다
const live = useFinalWeatherStore()
const configStore = useConfigStore()
const { arrivedCount, overallAverageTemp, hottestCity, loadedAt, errorMessage } = storeToRefs(live)

const totalCount = heroCities.length

const toDisplay = (celsius) =>
  configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius

const shortcuts = [
  { path: '/lessons', label: '실습 아카이브', desc: '1일차부터 4일차까지의 문법 실습과 과제' },
  { path: '/troubleshooting', label: '트러블슈팅', desc: '막혔던 자리와 푼 방법' },
]
</script>

<template>
  <section class="main-home">
    <PageHero
      eyebrow="SKALA Vue.js"
      title="전국 20개 도시의 지금 날씨"
      lead="카드 한 장이 도시 하나다. 구를 잡고 끌면 돌아가고, 카드를 누르면 그 도시의 상세 화면으로 간다."
    />

    <SphereHero />

    <router-link to="/lessons/final" class="hero-cta">
      <span class="cta-text">
        <strong>20개 도시를 목록으로 더 쉽게 보기</strong>
        <span>구를 돌리지 않고 한 화면에서 훑는다. 도시를 이름으로 찾고 즐겨찾기를 켤 수 있다</span>
      </span>
      <span class="cta-arrow" aria-hidden="true">→</span>
    </router-link>

    <el-alert
      v-if="errorMessage"
      class="hero-error"
      :title="errorMessage"
      type="error"
      :closable="false"
    />

    <dl class="hero-summary">
      <div>
        <dt>도착한 도시</dt>
        <dd>{{ arrivedCount }} / {{ totalCount }}곳</dd>
      </div>
      <div>
        <dt>평균 기온</dt>
        <dd v-if="arrivedCount > 0">
          {{ toDisplay(overallAverageTemp) }}{{ configStore.unitSymbol }}
        </dd>
        <dd v-else>기다리는 중</dd>
      </div>
      <div>
        <dt>가장 더운 곳</dt>
        <dd v-if="hottestCity">
          {{ hottestCity.name }} {{ toDisplay(hottestCity.temp) }}{{ configStore.unitSymbol }}
        </dd>
        <dd v-else>기다리는 중</dd>
      </div>
      <div>
        <dt>받아 온 시각</dt>
        <dd>{{ loadedAt === '' ? '기다리는 중' : loadedAt }}</dd>
      </div>
    </dl>

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

.hero-error {
  margin-bottom: -12px;
}

/* 구를 돌려 보다 도시를 훑고 싶어진 시선이 처음 닿는 자리라 아래 바로가기와 무게를 다르게 준다 */
.hero-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border: 1px solid var(--color-accent);
  border-radius: 12px;
  background: var(--color-accent-soft);
  color: var(--color-text);
}

.hero-cta:hover {
  border-color: var(--color-accent-hover);
}

.cta-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cta-text strong {
  font-size: 17px;
}

.cta-text span {
  color: var(--color-text-soft);
  font-size: 13px;
}

.cta-arrow {
  flex: none;
  color: var(--color-accent);
  font-size: 22px;
  line-height: 1;
}

.hero-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin: 0;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.hero-summary dt {
  color: var(--color-text-muted);
  font-size: 12px;
}

.hero-summary dd {
  margin: 4px 0 0;
  font-size: 17px;
  font-weight: 600;
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
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
}

.hero-link:hover {
  border-color: var(--color-accent);
}

.hero-link span {
  color: var(--color-text-muted);
  font-size: 13px;
}
</style>
