<template>
  <div class="pi-hole">
    Ads blocked today: {{ data.ads_blocked_today }}
    DNS queries today: {{ data.dns_queries_today }}
    Unique clients: {{ data.unique_clients }}
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'PiHole',
  data: () => ({
    apiUrl: `${process.env.VUE_APP_PIHOLE}admin/api.php`,
    data: {}
  }),
  created () {
    this.getData()
    setInterval(this.getData, 60 * 60 * 1000)
  },
  methods: {
    async getData () {
      this.data = await api(this.apiUrl)
    }
  }
}
</script>
