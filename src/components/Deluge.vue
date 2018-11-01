<template>
  <div class="deluge">
    <a :href="link" target="_blank">
      <img alt="Deluge Logo" height="64" src="../assets/deluge.webp">
    </a>

  </div>
</template>

<script>
export default {
  name: 'Deluge',
  data: () => ({
    link: process.env.VUE_APP_DELUGE
  })
}
</script>
