<template>
  <div class="sonarr">
    <a :href="apiBase" target="_blank">
      <img alt="Sonarr logo" src="../assets/sonarr.png">
    </a>

    Coming out next 7 days:
    <ul>
      <li v-for="show in shows" :key="show.id">
        <time :datetime="show.airDateUtc">
          In {{ distanceInWords(new Date(), show.airDateUtc) }}
        </time>
        (S{{zeroPadding(show.seasonNumber)}}/E{{zeroPadding(show.episodeNumber)}})
        {{ show.series.title }}: {{ show.title }}
        <img v-if="showImage(show.series)" height="50" :src="showImage(show.series)" :alt="show.title" />
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'
import zeroPadding from '../utils/zeroPadding'
import distanceInWords from 'date-fns/distance_in_words'
import addDays from 'date-fns/add_days'

// TODO: add TV show via dashboard
export default {
  name: 'Sonarr',
  data: () => ({
    shows: [],
    apiBase: process.env.VUE_APP_SONARR_BASE,
    apiToken: process.env.VUE_APP_SONARR_TOKEN
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
