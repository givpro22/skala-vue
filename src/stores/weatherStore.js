import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cityList: [
      { id: 'city_01', name: '서울', temp: 28, status: '맑음', feelsLike: 30, humidity: 45, wind: 2.1, favorite: false },
      { id: 'city_02', name: '수원', temp: 24, status: '비', feelsLike: 25, humidity: 82, wind: 3.4, favorite: false },
      { id: 'city_03', name: '부산', temp: 26, status: '구름', feelsLike: 28, humidity: 70, wind: 4.8, favorite: false },
      { id: 'city_04', name: '광주', temp: 29, status: '맑음', feelsLike: 32, humidity: 52, wind: 1.6, favorite: false },
      { id: 'city_05', name: '강릉', temp: 22, status: '흐림', feelsLike: 21, humidity: 65, wind: 5.2, favorite: false },
      { id: 'city_06', name: '제주', temp: 27, status: '소나기', feelsLike: 30, humidity: 78, wind: 6.1, favorite: false },
    ],
    searchQuery: '',
    hotOnly: false,
    selectedCityId: '',
    selectedCityInfo: '도시 카드를 선택해 주세요.',
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
    findIndex(id) {
      return this.cityList.findIndex((city) => city.id === id)
    },
  },
})
