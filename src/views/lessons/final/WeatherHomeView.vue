<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import ElWeatherSubNav from '../../../components/exercise/ElWeatherSubNav.vue'
import ElWeatherCard from '../../../components/exercise/ElWeatherCard.vue'
import { useFinalWeatherStore } from '../../../stores/finalWeatherStore.js'
import { useConfigStore } from '../../../stores/configStore.js'

const router = useRouter()
const live = useFinalWeatherStore()
const configStore = useConfigStore()

const {
  searchQuery,
  hotOnly,
  selectedCityId,
  selectedCityInfo,
  filteredList,
  favoriteCount,
  averageTemp,
  isLoading,
  errorMessage,
  loadedAt,
} = storeToRefs(live)

onMounted(() => {
  if (live.cityList.length === 0) {
    live.loadAll()
  }
})

const reload = async () => {
  await live.loadAll()
  if (live.errorMessage === '') {
    ElMessage.success('여섯 도시의 실시간 날씨를 다시 받아 왔습니다.')
  } else {
    ElMessage.error(live.errorMessage)
  }
}

const goDetail = (city) => {
  router.push(`/lessons/final/weather/${city.id}`)
}

const toggleFavorite = (city) => {
  live.toggleFavorite(city)
  ElMessage.info(`${city.name} 즐겨찾기를 ${city.favorite ? '켰습니다' : '껐습니다'}.`)
}
</script>

<template>
  <div class="weather-home-view">
    <h1>⛅ 최종본: 날씨 (Element Plus)</h1>
    <hr />

    <ElWeatherSubNav base-path="/lessons/final" />

    <el-card class="search-card">
      <template #header>도시 검색</template>

      <el-row :gutter="12" align="middle">
        <el-col :xs="24" :sm="10">
          <el-input
            v-model="searchQuery"
            placeholder="도시 이름을 한글로 입력하세요"
            clearable
          />
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-switch v-model="hotOnly" active-text="25도 이상만 보기" />
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-button type="primary" :loading="isLoading" @click="reload">다시 불러오기</el-button>
        </el-col>
      </el-row>

      <p v-if="loadedAt" class="loaded-at">{{ loadedAt }} 기준</p>
    </el-card>

    <el-alert v-if="errorMessage" :title="errorMessage" type="error" :closable="false" />

    <el-descriptions class="summary" :column="4" size="small" border>
      <el-descriptions-item label="검색어">
        {{ searchQuery === '' ? '없음' : searchQuery }}
      </el-descriptions-item>
      <el-descriptions-item label="표시 중">{{ filteredList.length }}곳</el-descriptions-item>
      <el-descriptions-item label="평균 기온">
        {{
          configStore.unit === 'fahrenheit'
            ? Math.round((averageTemp * 9) / 5 + 32)
            : averageTemp
        }}{{ configStore.unitSymbol }}
      </el-descriptions-item>
      <el-descriptions-item label="즐겨찾기">{{ favoriteCount }}곳</el-descriptions-item>
    </el-descriptions>

    <el-skeleton v-if="isLoading" :rows="6" animated />

    <el-empty v-else-if="filteredList.length === 0" description="검색 결과와 일치하는 도시가 없습니다." />

    <el-row v-else :gutter="12">
      <el-col v-for="city in filteredList" :key="city.id" :xs="24" :sm="12" :md="8">
        <ElWeatherCard
          class="grid-card"
          :city-item="city"
          :selected="selectedCityId === city.id"
          @select-card="live.selectCity"
          @click-detail="goDetail"
          @toggle-favorite="toggleFavorite"
        />
      </el-col>
    </el-row>

    <el-alert class="status" :title="selectedCityInfo" type="info" :closable="false" />
  </div>
</template>

<style scoped>
.weather-home-view {
  margin-bottom: 40px;
}

.search-card {
  margin-bottom: 16px;
}

.loaded-at {
  margin: 10px 0 0;
  color: #909399;
  font-size: 13px;
}

.summary {
  margin-bottom: 16px;
}

.grid-card {
  margin-bottom: 12px;
}

.status {
  margin-top: 16px;
}
</style>
