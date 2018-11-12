<template>
  <tile :row="3" :column="3" class="highlight">
    <h3 class="date">{{ date }}</h3>
    <h2 class="time">{{ time }}</h2>
    <div class="weather">
      <div id="left-information">
        <i class="thumbnail wi" :class="iconClass(currentWeather.code)"></i>
        <div class="temperature">{{ currentWeather.temp }}</div>
        <div class="unit">°C</div>
      </div>

      <div id="right-information">
        <span>Humidity: {{ currentWeather.humidity }}%</span><br/>
        <span>Wind speed: {{ currentWeather.wind }} {{ units.speed }}</span><br/>
        <span>Min: {{ forecastToday.low }} °C | Max: {{ forecastToday.high }} °C</span>
      </div>

      <div id="forecast">
        <ul>
          <li v-for="(forecast, key) in forecasts" :key="key">
            <div>{{ forecast.day }}</div>
            <i class="thumbnail-small wi" :class="iconClass(forecast.code)"></i>
            <b>{{ forecast.high }}°</b> {{ forecast.low }}°
          </li>
        </ul>
      </div>
    </div>
  </tile>
</template>

<script>
import format from 'date-fns/format'
import weather from '../services/weather'
import Tile from '../elements/Tile'

export default {
  name: 'Weather',
  components: { Tile },
  props: ['position'],
  data: () => ({
    city: process.env.VUE_APP_CITY,
    date: '',
    time: '',
    currentWeather: {},
    forecastToday: {},
    forecasts: [],
    units: {}
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
      this.date = format(datetime, 'dddd Do [of] MMMM')
    },
    async fetchWeather () {
      const channel = await weather.get(this.city)

      this.currentWeather = {
        temp: channel.item.condition.temp,
        code: channel.item.condition.code,
        humidity: channel.atmosphere.humidity,
        wind: channel.wind.speed
      }

      this.units = channel.units

      const [forecastToday, ...forecasts] = channel.item.forecast
      this.forecastToday = forecastToday
      this.forecasts = forecasts.slice(0, 4)
    },
    iconClass (code) {
      return `wi-yahoo-${code}`
    }
  }
}
</script>

<style lang="scss" scoped>
$wi-path: '../../node_modules/weather-icons2/font';
@import 'weather-icons2/sass/weather-icons.scss';
@import '../styles/variables';

.highlight {
  background-color: $third !important;
  color: $fifth;
  text-align: center;

  .time {
    color: $fourth;
  }

  .weather {
    margin: auto;
    padding: 20px 16px 24px 16px;

    .top {
      margin-bottom: 20px;

      .status {
        font-size: 13px;
        line-height: 1.4
      }
    }
  }

  .thumbnail {
    float: left;
    font-size: 64px;
  }

  .thumbnail-small {
    font-size: 48px;
  }

  #left-information .temperature {
    float: left;
    margin-top: -3px;
    padding-left: 10px;

    font-size: 64px;
  }

  #left-information .unit {
    float: left;
    margin-top: 6px;
    font-size: 20px;
  }

  #right-information {
    text-align: left;
    float: right;
    padding-left: 5px;
    line-height: 22px;
    padding-top: 2px;
    min-width: 43%;
    font-weight: lighter;
  }

  #forecast {
    padding-top: 10px;
    clear: both;
  }

  #forecast ul {
    padding: 0;
    margin: 15px 0 5px 0;
  }

  #forecast ul li {
    display: inline-block;
    height: 90px;
    width: 73px;
    text-align: center;
    line-height: 1;
  }
}
</style>
