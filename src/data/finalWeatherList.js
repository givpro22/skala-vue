import { reactive } from 'vue'

// 최종본의 목록 화면과 상세 화면이 같은 배열을 본다. 과제 4 스냅샷과는 섞지 않으려고 따로 둔다
export const finalWeatherList = reactive([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', feelsLike: 30, humidity: 45, wind: 2.1, favorite: false },
  { id: 'city_02', name: '수원', temp: 24, status: '비', feelsLike: 25, humidity: 82, wind: 3.4, favorite: false },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', feelsLike: 28, humidity: 70, wind: 4.8, favorite: false },
  { id: 'city_04', name: '광주', temp: 29, status: '맑음', feelsLike: 32, humidity: 52, wind: 1.6, favorite: false },
  { id: 'city_05', name: '강릉', temp: 22, status: '흐림', feelsLike: 21, humidity: 65, wind: 5.2, favorite: false },
  { id: 'city_06', name: '제주', temp: 27, status: '소나기', feelsLike: 30, humidity: 78, wind: 6.1, favorite: false },
])
