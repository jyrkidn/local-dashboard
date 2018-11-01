<template>
  <div class="plex">
    <a :href="apiBase" target="_blank">
      <img alt="Plex logo" src="../assets/plex.png">
    </a>
    <div v-if="sessions.length > 0">
      <div v-for="session in sessions" :key="session.index">
        Playing {{ getTitle(session) }} via {{ session.Player.title }}
        <img height="100" :src="apiUrl(session.thumb)" :alt="session.title" />
      </div>
    </div>
    <div v-else>
      Nothing playing right now
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Plex',
  data: () => ({
    sessions: [],
    apiBase: process.env.VUE_APP_PLEX,
    apiToken: process.env.VUE_APP_PLEX_TOKEN
  }),
  created () {
    this.getSessions()
    // setInterval(this.getSessions, 60 * 60 * 1000)
  },
  methods: {
    async getSessions () {
      const data = await api(this.apiUrl('status/sessions'))
      if (data.MediaContainer.size > 0 && data.MediaContainer.Metadata) {
        this.sessions = data.MediaContainer.Metadata
      } else {
        this.sessions = []
      }
    },
    apiUrl (path) {
      let url = `${this.apiBase}${path}?X-Plex-Token=${this.apiToken}`

      return url.replace(/(?<!:)\/\//g, '/')
    },
    getTitle (session) {
      let title = session.title

      if (session.grandparentTitle) {
        title = `${session.grandparentTitle}: ${title}`
      }

      return title
    }
  }
}
</script>
