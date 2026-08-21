import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// baseURL과 공통 파라미터를 인스턴스에 걸어 두면 호출부가 짧아진다
const openWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: { appid: API_KEY, units: 'metric', lang: 'kr' },
})

const openMeteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
})

export const fetchCurrentWeather = async (city) => {
  const response = await openWeather.get('/weather', {
    params: { lat: city.lat, lon: city.lon },
  })
  const data = response.data

  return {
    id: city.id,
    name: city.name,
    temp: Math.round(data.main.temp),
    status: data.weather[0].description,
    icon: data.weather[0].icon,
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    favorite: false,
  }
}

// OpenWeatherMap이 함께 제공하는 대기질 API
export const fetchAirPollution = async (city) => {
  const response = await openWeather.get('/air_pollution', {
    params: { lat: city.lat, lon: city.lon },
  })
  const row = response.data.list[0]

  return {
    aqi: row.main.aqi,
    pm10: row.components.pm10,
    pm25: row.components.pm2_5,
  }
}

// 키가 필요 없는 외부 API. 며칠치 최고 최저 기온을 받아 온다
export const fetchDailyForecast = async (city) => {
  const response = await openMeteo.get('/forecast', {
    params: {
      latitude: city.lat,
      longitude: city.lon,
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone: 'Asia/Seoul',
      forecast_days: 3,
    },
  })
  const daily = response.data.daily

  return daily.time.map((day, index) => ({
    day,
    max: Math.round(daily.temperature_2m_max[index]),
    min: Math.round(daily.temperature_2m_min[index]),
  }))
}
