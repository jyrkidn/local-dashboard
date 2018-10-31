<template>
  <div id="app">
    <Radarr />
    <Sonarr />
    <Weather />
    <PiHole />
    <Plex />
  </div>
</template>

<script>
import Radarr from './components/Radarr'
import Sonarr from './components/Sonarr'
import PiHole from './components/PiHole'
import Weather from './components/Weather'
import Plex from './components/Plex'

export default {
  name: 'app',
  components: {
    Radarr,
    Weather,
    PiHole,
    Plex,
    Sonarr
  }
}
</script>
