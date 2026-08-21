import { defineStore } from 'pinia'
import { heroCities } from '../data/heroCities.js'
import { fetchCurrentWeather } from '../api/weatherApi.js'

export const useHeroWeatherStore = defineStore('heroWeather', {
  state: () => ({
    tempByCity: {},
    requested: false,
  }),
  actions: {
    // 스무 건을 한꺼번에 띄우고 도착하는 대로 하나씩 채운다.
    // axios.all로 묶어 기다리면 제일 느린 응답이 올 때까지 카드가 전부 비어 있다
    loadTemps() {
      if (this.requested) {
        return
      }
      this.requested = true

      heroCities.forEach((city) => {
        fetchCurrentWeather(city)
          .then((weather) => {
            this.tempByCity[city.id] = weather.temp
          })
          .catch((error) => {
            console.error('기온 조회 실패:', city.name, error)
          })
      })
    },
  },
})
