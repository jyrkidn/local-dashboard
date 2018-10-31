<template>
  <div id="app">
    <Radarr />
    <Weather />
  </div>
</template>

<script>
import Radarr from './components/Radarr'
import Weather from './components/Weather'

export default {
  name: 'app',
  components: {
    Radarr,
    Weather
  }
}
</script>
