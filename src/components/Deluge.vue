<template>
  <tile :row="1" :column="1" :logo="logo" :link="link">
  </tile>
</template>

<script>
import Tile from '../elements/Tile'
import logo from '../assets/deluge.webp'

export default {
  name: 'Deluge',
  components: { Tile },
  props: ['position'],
  data: () => ({
    link: process.env.VUE_APP_DELUGE,
    logo
  })
}
</script>
