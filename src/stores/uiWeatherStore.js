import axios from 'axios'
import { defineStore } from 'pinia'
import { cityCoords } from '../data/cityCoords.js'
import { fetchCurrentWeather, fetchAirPollution, fetchDailyForecast } from '../api/weatherApi.js'

export const useUiWeatherStore = defineStore('uiWeather', {
  state: () => ({
    cityList: [],
    airByCity: {},
    forecastByCity: {},
    searchQuery: '',
    hotOnly: false,
    selectedCityId: '',
    selectedCityInfo: '도시 카드를 선택해 주세요.',
    isLoading: false,
    errorMessage: '',
    loadedAt: '',
  }),
  getters: {
    filteredList: (state) =>
      state.cityList.filter((city) => {
        const matchName = city.name.includes(state.searchQuery)
        const matchTemp = state.hotOnly ? city.temp >= 25 : true
        return matchName && matchTemp
      }),
    favoriteCount: (state) => state.cityList.filter((city) => city.favorite).length,
    averageTemp() {
      const list = this.filteredList
      if (list.length === 0) {
        return 0
      }
      let sum = 0
      list.forEach((city) => {
        sum += city.temp
      })
      return Math.round(sum / list.length)
    },
  },
  actions: {
    // 도시 여섯 곳을 한꺼번에 요청한다. 하나씩 기다리면 그만큼 느려진다
    async loadAll() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const results = await axios.all(cityCoords.map((city) => fetchCurrentWeather(city)))
        this.cityList = results
        this.loadedAt = new Date().toLocaleTimeString('ko-KR')
      } catch (error) {
        console.error('날씨 목록 조회 실패:', error)
        this.errorMessage = '날씨 데이터를 가져오지 못했습니다. API 키와 네트워크를 확인하세요.'
      } finally {
        this.isLoading = false
      }
    },
    async loadDetail(cityId) {
      const city = cityCoords.find((item) => item.id === cityId)
      if (city === undefined) {
        return
      }

      try {
        const [air, forecast] = await axios.all([fetchAirPollution(city), fetchDailyForecast(city)])
        this.airByCity[cityId] = air
        this.forecastByCity[cityId] = forecast
      } catch (error) {
        console.error('상세 정보 조회 실패:', error)
        this.errorMessage = '대기질과 예보를 가져오지 못했습니다.'
      }
    },
    setQuery(value) {
      this.searchQuery = value
    },
    toggleHot() {
      this.hotOnly = !this.hotOnly
    },
    selectCity(city) {
      this.selectedCityId = city.id
      this.selectedCityInfo = `${city.name}이 선택되었습니다.`
    },
    toggleFavorite(city) {
      city.favorite = !city.favorite
    },
    findCity(id) {
      return this.cityList.find((city) => city.id === id)
    },
  },
})
