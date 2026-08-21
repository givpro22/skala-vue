<script setup>
import { ref, computed } from 'vue'
import { troubleshootingDays } from '../data/troubleshootingLog.js'

const openDays = ref(
  troubleshootingDays.filter((entry) => entry.items.length > 0).map((entry) => `day-${entry.day}`),
)

const totalCount = computed(() =>
  troubleshootingDays.reduce((sum, entry) => sum + entry.items.length, 0),
)

const openCount = computed(() =>
  troubleshootingDays.reduce(
    (sum, entry) => sum + entry.items.filter((item) => !item.resolved).length,
    0,
  ),
)
</script>

<template>
  <div class="troubleshooting-view">
    <h1>트러블슈팅 기록</h1>

    <p class="intro">
      강의를 들으며 막혔던 지점과 어떻게 풀었는지를 날짜별로 모았다. 커밋 히스토리와 코드에 남은
      주석에서 확인한 것만 적었고, 흔적을 찾지 못한 날은 비워 뒀다. 아직 못 고친 것도 그대로 뒀다.
      본문에 적힌 주소는 그날 쓰던 것이라 지금 아카이브 주소와 다를 수 있다.
    </p>

    <div class="counts">
      <el-tag type="info" effect="plain">전체 {{ totalCount }}건</el-tag>
      <el-tag type="warning" effect="plain">미해결 {{ openCount }}건</el-tag>
    </div>

    <el-collapse v-model="openDays">
      <el-collapse-item
        v-for="entry in troubleshootingDays"
        :key="entry.day"
        :name="`day-${entry.day}`"
      >
        <template #title>
          <div class="day-title">
            <strong>Day {{ entry.day }}</strong>
            <span class="day-date">{{ entry.date }}</span>
            <span class="day-topic">{{ entry.topic }}</span>
            <el-tag size="small" :type="entry.items.length ? 'success' : 'info'" effect="plain">
              {{ entry.items.length }}건
            </el-tag>
          </div>
        </template>

        <el-empty v-if="entry.items.length === 0" :description="entry.note" />

        <template v-else>
          <p v-if="entry.note" class="day-note">{{ entry.note }}</p>

          <article v-for="item in entry.items" :key="item.title" class="item">
            <header class="item-head">
              <h3>{{ item.title }}</h3>
              <el-tag size="small" :type="item.resolved ? 'success' : 'danger'">
                {{ item.resolved ? '해결' : '미해결' }}
              </el-tag>
            </header>

            <dl>
              <dt>증상</dt>
              <dd>{{ item.symptom }}</dd>

              <dt>원인</dt>
              <dd>{{ item.cause }}</dd>

              <dt>해결</dt>
              <dd>
                {{ item.fix }}
                <pre v-if="item.code">{{ item.code }}</pre>
              </dd>

              <dt>배운 것</dt>
              <dd>{{ item.learned }}</dd>
            </dl>

            <footer class="item-foot">
              <el-tag
                v-for="hash in item.commits"
                :key="hash"
                size="small"
                type="info"
                effect="plain"
              >
                {{ hash }}
              </el-tag>
              <code v-for="path in item.files" :key="path">{{ path }}</code>
            </footer>
          </article>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.troubleshooting-view {
  max-width: 900px;
}

.intro {
  color: #555;
  line-height: 1.7;
}

.counts {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.day-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.day-date {
  color: #888;
  font-size: 13px;
}

.day-topic {
  color: #555;
  font-size: 13px;
}

.day-note {
  margin: 0 0 16px;
  color: #777;
  font-size: 14px;
}

.item {
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
}

.item-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.item-head h3 {
  margin: 0;
  font-size: 16px;
}

dl {
  margin: 0;
  display: grid;
  grid-template-columns: 72px 1fr;
  row-gap: 10px;
  column-gap: 12px;
}

dt {
  color: #888;
  font-size: 13px;
}

dd {
  margin: 0;
  line-height: 1.7;
}

pre {
  margin: 8px 0 0;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 13px;
  overflow-x: auto;
}

.item-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.item-foot code {
  color: #777;
  font-size: 12px;
}
</style>
