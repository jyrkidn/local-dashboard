<template>
<!-- A1-L5 -->
  <div id="app" class="wrapper">
    <Weather position="A1:F2" modifiers="overflow" />
    <PiHole position="G1:I2" modifiers="overflow" />
    <Sonarr position="J1:L3" modifiers="overflow" />
    <Radarr position="A3:C4" modifiers="overflow" />
    <Plex position="D3:E3" modifiers="overflow" />
    <MotionEye position="F3:I5" modifiers="overflow" />
    <Deluge position="L4:L4" modifiers="overflow" />
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

.wrapper {
  display: grid;
  grid-auto-rows: 110px;
  grid-gap: 10px;

  .tile {
    border-radius: 5px;
    padding: 1rem;
    font-size: 14px;
    background-color: $fifth;
    box-shadow: 0px 0px 15px 0px rgba(68,91,200,0.15);
    overflow: hidden;
  }
}

@media (min-width: 1281px) {
  .wrapper {
     grid-template-columns: repeat(8, 1fr);
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  .wrapper {
     grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .wrapper {
     grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 601px) and (max-width: 767px) {
  .wrapper {
     grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 481px) and (max-width: 600px) {
  .wrapper {
     grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .wrapper {
     grid-template-columns: repeat(1, 1fr);

     .tile {
       grid-column: span 1 !important;
     }
  }
}
</style>
