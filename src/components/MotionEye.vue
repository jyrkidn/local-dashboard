<template>
  <tile :logo="logo" :link="link">
    <img height="200" :src="streamLink">
  </tile>
</template>

<script>
import Tile from '../elements/Tile'
import logo from '../assets/motioneye.svg'

export default {
  name: 'MotionEye',
  components: { Tile },
  data: () => ({
    link: process.env.VUE_APP_MOTIONEYE,
    streamLink: process.env.VUE_APP_MOTIONEYE_STREAM,
    logo
  })
}
</script>
