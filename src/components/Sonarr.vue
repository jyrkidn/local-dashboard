<template>
  <tile :row="6" :column="2" :logo="logo" :link="apiBase" title="Coming out next 7 days">
    <List :items="shows">
      <template slot="title" slot-scope="{ item }">
        (S{{zeroPadding(item.seasonNumber)}}/E{{zeroPadding(item.episodeNumber)}})
        {{ item.series.title }}: {{ item.title }}
      </template>
      <template slot="info" slot-scope="{ item }">
        <span>
          In {{ distanceInWords(new Date(), item.airDateUtc) }}
        </span>
      </template>
    </List>
  </tile>
</template>

<script>
import Tile from '../elements/Tile'
import api from '../services/api'
import zeroPadding from '../utils/zeroPadding'
import distanceInWords from 'date-fns/distance_in_words'
import addDays from 'date-fns/add_days'
import List from '../elements/List'
import logo from '../assets/sonarr.png'

// TODO: add TV show via dashboard
export default {
  name: 'Sonarr',
  components: { Tile, List },
  props: ['position'],
  data: () => ({
    shows: [],
    apiBase: process.env.VUE_APP_SONARR_BASE,
    apiToken: process.env.VUE_APP_SONARR_TOKEN,
    logo
  }),
  async created () {
    const currentDate = new Date()
    const startDate = addDays(currentDate, 1)
    const endDate = addDays(currentDate, 7)

    this.shows = await api(
      `${this.apiUrl('/calendar')}&start=${startDate.toLocaleDateString()}&end=${endDate.toLocaleDateString()}`
    )
  },
  methods: {
    showImage (show) {
      if (!show.images || show.images.length === 0) {
        return false
      }

      return show.images[0].url
    },
    apiUrl (path) {
      return `${this.apiBase}api/${path}?apikey=${this.apiToken}`
    },
    zeroPadding,
    distanceInWords
  }
}
</script>
