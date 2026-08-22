import axios from 'axios'
import { defineStore } from 'pinia'
import { heroCities } from '../data/heroCities.js'
import { fetchCurrentWeather, fetchAirPollution, fetchDailyForecast } from '../api/weatherApi.js'

// 도착 순서가 제각각이라 그냥 밀어 넣으면 목록이 매번 다른 차례로 쌓인다.
// 데이터에 적힌 차례를 미리 뽑아 두고 그 자리에 끼워 넣는다
const cityOrder = {}
const cityById = {}
heroCities.forEach((city, index) => {
  cityOrder[city.id] = index
  cityById[city.id] = city
})

// 사진과 명소 이름은 heroCities에만 있다. weatherApi는 과제 6과 7이 함께 쓰는 파일이라
// 건드리지 않고 여기서 붙인다. 덕분에 스피어 카드와 목록 카드가 같은 사진을 보게 된다
const withPlace = (weather) => ({
  ...weather,
  place: cityById[weather.id].place,
  photo: cityById[weather.id].photo,
})

export const useFinalWeatherStore = defineStore('finalWeather', {
  state: () => ({
    cityList: [],
    airByCity: {},
    forecastByCity: {},
    searchQuery: '',
    hotOnly: false,
    selectedCityId: '',
    selectedCityInfo: '도시 카드를 선택해 주세요.',
    isLoading: false,
    requested: false,
    errorMessage: '',
    loadedAt: '',
  }),
  getters: {
    // 메인홈 스피어가 카드마다 기온을 찾아 쓴다
    tempByCity: (state) => {
      const temps = {}
      state.cityList.forEach((city) => {
        temps[city.id] = city.temp
      })
      return temps
    },
    // 스트리밍 중에는 아직 안 온 도시가 있다. 상세 화면이 이걸 보고 빈 화면 대신 뼈대를 띄운다.
    // requested만 보면 적재가 끝난 뒤에도 못 받은 도시가 남았을 때 영영 참이라
    // 그 도시 상세가 뼈대에 갇힌다. 아직 받는 중일 때로 좁힌다
    isFilling: (state) => state.isLoading && state.cityList.length < heroCities.length,
    filteredList: (state) =>
      state.cityList.filter((city) => {
        const matchName = city.name.includes(state.searchQuery)
        const matchTemp = state.hotOnly ? city.temp >= 25 : true
        return matchName && matchTemp
      }),
    favoriteCount: (state) => state.cityList.filter((city) => city.favorite).length,
    // 메인홈 요약 줄이 본다. 최종본 목록과 같은 cityList를 보므로 두 화면의 숫자가 어긋나지 않는다.
    // averageTemp는 filteredList를 보기 때문에 최종본에서 검색어를 남겨 두고 메인홈으로 돌아오면
    // 도착한 도시는 스무 곳인데 평균은 걸러진 한 곳 값이 된다. 요약 줄은 이쪽을 쓴다
    arrivedCount: (state) => state.cityList.length,
    overallAverageTemp: (state) => {
      if (state.cityList.length === 0) {
        return 0
      }
      let sum = 0
      state.cityList.forEach((city) => {
        sum += city.temp
      })
      return Math.round(sum / state.cityList.length)
    },
    hottestCity: (state) => {
      if (state.cityList.length === 0) {
        return null
      }
      return state.cityList.reduce((top, city) => (city.temp > top.temp ? city : top))
    },
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
    insertCity(weather) {
      const at = this.cityList.findIndex((item) => cityOrder[item.id] > cityOrder[weather.id])
      if (at === -1) {
        this.cityList.push(weather)
      } else {
        this.cityList.splice(at, 0, weather)
      }
    },
    // 메인홈과 최종본이 첫 진입에 함께 쓰는 적재 경로다. 스무 건을 한꺼번에 띄우고
    // 도착하는 대로 한 곳씩 채운다. axios.all로 묶어 기다리면 제일 느린 응답이 올 때까지
    // 카드가 전부 비어 있다.
    // 전에는 메인홈만 이걸 부르고 최종본은 loadAll을 불렀다. 그런데 이 함수가 requested를
    // 켜 두면 최종본의 onMounted가 loadAll을 건너뛰어서, 목록이 스트림으로 들어온 만큼만
    // 남고 불러온 시각도 비어 있었다. 두 화면이 같은 함수를 부르게 바꿔서 없앴다
    loadStream() {
      if (this.requested) {
        return
      }
      this.requested = true
      this.isLoading = true
      this.errorMessage = ''

      let done = 0
      let failed = 0

      heroCities.forEach((city) => {
        fetchCurrentWeather(city)
          .then((weather) => {
            this.insertCity(withPlace(weather))
          })
          .catch((error) => {
            failed += 1
            console.error('기온 조회 실패:', city.name, error)
          })
          .finally(() => {
            done += 1
            if (done < heroCities.length) {
              return
            }
            this.isLoading = false
            this.loadedAt = new Date().toLocaleTimeString('ko-KR')
            if (failed === heroCities.length) {
              this.errorMessage =
                '날씨 데이터를 가져오지 못했습니다. API 키와 네트워크를 확인하세요.'
            }
          })
      })
    },
    // 다시 불러오기 버튼이 쓴다. 스무 곳을 한꺼번에 요청한다. 하나씩 기다리면 그만큼 느려진다
    async loadAll() {
      this.isLoading = true
      this.requested = true
      this.errorMessage = ''

      // 목록을 통째로 갈아 끼우면 켜 둔 즐겨찾기가 같이 날아간다. 켠 것만 따로 빼 뒀다 되붙인다
      const favorites = {}
      this.cityList.forEach((city) => {
        favorites[city.id] = city.favorite
      })

      try {
        const results = await axios.all(heroCities.map((city) => fetchCurrentWeather(city)))
        this.cityList = results.map((weather) => ({
          ...withPlace(weather),
          favorite: favorites[weather.id] === true,
        }))
        this.loadedAt = new Date().toLocaleTimeString('ko-KR')
      } catch (error) {
        console.error('날씨 목록 조회 실패:', error)
        this.errorMessage = '날씨 데이터를 가져오지 못했습니다. API 키와 네트워크를 확인하세요.'
      } finally {
        this.isLoading = false
      }
    },
    async loadDetail(cityId) {
      const city = heroCities.find((item) => item.id === cityId)
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
