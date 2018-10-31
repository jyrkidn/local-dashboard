<template>
  <div class="weather">
    <span>{{ date }}</span>
    <span>{{ time }}</span>
    <div>
      <span v-if="currentWeather.temp">{{ currentWeather.temp }} °C</span>
      <span>
        <i class="wi" :class="iconClass(currentWeather.code)"></i>
      </span>
      <div>
        Today's forecast
        <span>
          <i class="wi" :class="iconClass(forecastToday.code)"></i>
        </span>
        <span>Min: {{ forecastToday.high }} °C</span>
        <span>Max: {{ forecastToday.high }} °C</span>
      </div>
      <div v-for="(forecast, key) in forecasts" :key="key">
        {{ forecast.day }} {{ forecast.date }}
        <span>
          <i class="wi" :class="iconClass(forecast.code)"></i>
        </span>
        <span>Min: {{ forecast.high }} °C</span>
        <span>Max: {{ forecast.high }} °C</span>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import weather from '../services/weather'

export default {
  name: 'Weather',
  data: () => ({
    city: process.env.VUE_APP_CITY,
    date: '',
    time: '',
    currentWeather: {},
    forecastToday: {},
    forecasts: []
  }),
  created () {
    this.refreshTime()
    setInterval(this.refreshTime, 1000)
    this.fetchWeather()
    setInterval(this.fetchWeather, 15 * 60 * 1000)
  },
  methods: {
    refreshTime () {
      const datetime = new Date()
      this.time = format(datetime, 'HH:mm:ss')
      this.date = format(datetime, 'DD/MM/YYYY')
    },
    async fetchWeather () {
      const item = await weather.get(this.city)

      this.currentWeather = item.condition

      const [forecastToday, ...forecasts] = item.forecast
      this.forecastToday = forecastToday
      this.forecasts = forecasts.slice(0, 2)
    },
    iconClass (code) {
      return `wi-yahoo-${code}`
    }
  }
}
</script>

<style lang="sass" scoped>
$wi-path: '../../node_modules/weather-icons2/font';
@import 'weather-icons2/sass/weather-icons.scss'
</style>
