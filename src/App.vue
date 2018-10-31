<template>
  <div id="app">
    <Radarr />
    <Sonarr />
    <!-- <Weather /> -->
  </div>
</template>

<script>
import Radarr from './components/Radarr'
import Sonarr from './components/Sonarr'
// import Weather from './components/Weather'

export default {
  name: 'app',
  components: {
    Radarr,
    // Weather,
    Sonarr
  }
}
</script>
