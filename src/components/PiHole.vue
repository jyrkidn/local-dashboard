<template>
  <tile :row="3" :column="1" :logo="logo" :link="link">
    <List :items="items">
      <template slot="title" slot-scope="{ item }">
        {{ item.title }}
      </template>
      <template slot="info" slot-scope="{ item }">
        {{ item.info }}
      </template>
    </List>
  </tile>
</template>

<script>
import api from '../services/api'
import Tile from '../elements/Tile'
import List from '../elements/List'
import logo from '../assets/pihole.svg'

export default {
  name: 'PiHole',
  components: { Tile, List },
  props: ['position'],
  data: () => ({
    link: process.env.VUE_APP_PIHOLE,
    apiUrl: 'admin/api.php',
    items: [],
    logo
  }),
  created () {
    this.getData()
    setInterval(this.getData, 60 * 60 * 1000)
  },
  methods: {
    async getData () {
      const data = await api(this.link + this.apiUrl)

      this.items.push({
        title: 'Ads blocked today',
        info: data.ads_blocked_today
      })
      this.items.push({
        title: 'DNS queries today',
        info: data.dns_queries_today
      })
      this.items.push({
        title: 'Unique clients',
        info: data.unique_clients
      })
    }
  }
}
</script>
