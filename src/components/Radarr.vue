<template>
  <div class="radarr">
    <img height="50" src="http://192.168.0.195:7878/Content/Images/logos/128.png" alt="Radarr logo">

    Coming out next three months:
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
        {{ movie.inCinemas }}
        {{ movie.physicalRelease }}
        <img v-if="movieImage(movie)" height="50" :src="movieImage(movie)" :alt="movie.title" />
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../utils/api'

// TODO: add movie via dashboard
export default {
  name: 'Radarr',
  data: () => ({
    movies: [],
    apiBase: process.env.VUE_APP_RADARR_BASE,
    apiToken: process.env.VUE_APP_RADARR_TOKEN
  }),
  async created () {
    let date = new Date()
    date.setMonth(date.getMonth() + 3)

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
      return `${this.apiBase}/${path}?apikey=${this.apiToken}`
    }
  }
}
</script>
