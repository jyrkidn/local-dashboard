<template>
  <div id="app">
    <Weather class="span-2" />
    <PiHole />
    <Radarr class="span-2" />
    <Sonarr class="span-2" />
    <Plex />
    <MotionEye />
    <Deluge />
  </div>
</template>

<script>
import Radarr from './components/Radarr'
import Sonarr from './components/Sonarr'
import PiHole from './components/PiHole'
import Weather from './components/Weather'
import Plex from './components/Plex'
import MotionEye from './components/MotionEye'
import Deluge from './components/Deluge'

export default {
  name: 'app',
  components: {
    Radarr,
    Weather,
    PiHole,
    Plex,
    MotionEye,
    Deluge,
    Sonarr
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

#app {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 10px;
  grid-auto-rows: minmax(180px, auto);
  grid-auto-flow: dense;
  padding: 10px;

  .grid-item {
    border-radius: 5px;
    padding: 1rem;
    font-size: 14px;
    background-color: $fifth;
    box-shadow: 0px 0px 15px 0px rgba(68,91,200,0.15);

    &.span-2 {
      grid-column-end: span 2;
      // grid-row-end: span 2;
    }

    &.span-3 {
      grid-column-end: span 3;
    }
  }
}
</style>
