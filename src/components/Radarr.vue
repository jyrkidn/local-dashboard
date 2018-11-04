<template>
  <tile :logo="logo" :link="apiBase" title="Coming out next three months">
    <List :items="movies">
      <template slot="title" slot-scope="{ item }">
        {{ item.title }}
      </template>
      <template slot="info" slot-scope="{ item }">
        <span v-if="item.physicalRelease">
          Physical release in {{ distanceInWords(new Date(), item.physicalRelease) }}
        </span>
        <span v-if="!item.physicalRelease">
          In cinemas in {{ distanceInWords(new Date(), item.inCinemas) }}
        </span>
      </template>
    </List>
  </tile>
</template>

<script>
import api from '../services/api'
import addMonths from 'date-fns/add_months'
import distanceInWords from 'date-fns/distance_in_words'
import List from '../elements/List'
import Tile from '../elements/Tile'
import logo from '../assets/radarr.png'

// TODO: add movie via dashboard
export default {
  name: 'Radarr',
  components: { Tile, List },
  data: () => ({
    movies: [],
    apiBase: process.env.VUE_APP_RADARR_BASE,
    apiToken: process.env.VUE_APP_RADARR_TOKEN,
    logo
  }),
  async created () {
    const date = addMonths(new Date(), 3)

    this.movies = await api(
      `${this.apiUrl('/calendar')}&end=${date.toLocaleDateString()}`
    )
  },
  methods: {
    movieImage (movie) {
      if (!movie.images || movie.images.length === 0) {
        return false
      }

      return this.apiUrl(movie.images[0].url)
    },
    apiUrl (path) {
      return `${this.apiBase}api/${path}?apikey=${this.apiToken}`
    },
    distanceInWords
  }
}
</script>
